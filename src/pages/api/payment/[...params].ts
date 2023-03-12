// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import dateFormat from 'dateformat';
import { nanoid } from 'nanoid';
import { PATHS } from '~/constants';
import handlePaymentSuccess from '~/server/helper/handlePaymentSuccess';
import sortObject from '~/utils/sortObject';

import { prisma } from '../../../server/db/client';

import type { NextApiRequest, NextApiResponse } from 'next';
const payment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { params } = query;

  const VNPAY_CONFIGS = JSON.parse(String(process.env.VNPAY_CONFIGS));

  if (
    !VNPAY_CONFIGS['vnp_TmnCode'] ||
    !VNPAY_CONFIGS['vnp_HashSecret'] ||
    !VNPAY_CONFIGS['vnp_Url'] ||
    !VNPAY_CONFIGS['vnp_ReturnUrl']
  ) {
    return res.status(500).json({
      message: 'vnpay_configs error',
    });
  }

  try {
    if (method === 'POST' && params[0] === 'create') {
      const { courseIds } = req.body;
      const { userId } = req.body;
      const orderInfo = req.body.orderDescription;

      if (!orderInfo) {
        return res.status(400).json({ message: 'orderInfo is required' });
      }

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      if (!courseIds && !Array.isArray(courseIds)) {
        return res.status(400).json({ message: 'courses id are required' });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          payments: {
            create: courseIds.map((courseId) => ({
              status: 'PENDING',
              course: { connect: { id: courseId } },
              paymentGId: orderInfo,
            })),
          },
        },
      });

      // this code take from vnpay example
      // https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop

      const ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      const tmnCode = VNPAY_CONFIGS['vnp_TmnCode'];
      const secretKey = VNPAY_CONFIGS['vnp_HashSecret'];
      let vnpUrl = VNPAY_CONFIGS['vnp_Url'];
      const returnUrl = VNPAY_CONFIGS['vnp_ReturnUrl'];

      const date = new Date();
      const createDate = dateFormat(date, 'yyyymmddHHmmss');
      const orderId = nanoid();

      const amount = req.body.amount;
      const bankCode = req.body.bankCode;

      const orderType = req.body.orderType;
      let locale = req.body.language;
      if (!locale) {
        locale = 'vn';
      }
      const currCode = 'VND';
      let vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      vnp_Params['vnp_Merchant'] = 'Next Edu';
      vnp_Params['vnp_Locale'] = locale;
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = orderInfo;
      vnp_Params['vnp_OrderType'] = orderType;
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;
      if (bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      const querystring = require('qs');
      const signData = querystring.stringify(vnp_Params, { encode: false });
      const crypto = require('crypto');
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

      return res.status(200).json({ vnpUrl, vnp_Params });
    }

    if (method === 'GET' && params[0] === 'vnpay_return') {
      let vnp_Params = req.query;

      vnp_Params = sortObject(vnp_Params);

      const vnpStatus = vnp_Params['vnp_TransactionStatus'];

      const orderId = vnp_Params['vnp_TxnRef'];
      const amount = Number(vnp_Params['vnp_Amount']);
      const orderInfo = vnp_Params['vnp_OrderInfo']; // -> paymentGId

      // console.log('orderInfo:: ', { orderId, orderInfo, amount });

      if (vnpStatus === '00') {
        /* this function handle:
          update status payment table to "SUCCESS"
          delete all record of cart table
          enroll course
          incremental revenue amount
        */
        await handlePaymentSuccess({ paymentGId: orderInfo, amount, orderId });

        return res.redirect(`/${PATHS.PAYMENT_STATUS}?success=true`);
      } else {
        return res.redirect(`/${PATHS.CART}`);
      }
    }
  } catch (error) {
    console.error('PAYMENT ERROR: ', error);
    return res.status(500).json({ error: 'error' });
  }

  return res.status(400).json({ message: 'error' });
};

export default payment;
