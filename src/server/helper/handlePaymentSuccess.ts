import { prisma } from '../db/client';

interface handlePaymentSuccessParams {
  paymentGId: string;
  orderId: string;
  amount: number;
}

export default async function handlePaymentSuccess({
  paymentGId,
  orderId,
  amount,
}: handlePaymentSuccessParams) {
  //update & find payment table:
  const [paymentsWithResult] = await Promise.allSettled([
    await prisma.payment.findMany({ where: { paymentGId } }),
    await prisma.payment.updateMany({
      where: { paymentGId },
      data: { orderId, status: 'SUCCESS' },
    }),
  ]);

  // console.log('paymentsWithResult:: ', paymentsWithResult);

  const payments = paymentsWithResult?.value;
  const userId = payments[0].userId;

  // delete all records of cart & enroll course;
  await Promise.allSettled([
    await prisma.student.upsert({
      where: { userId: payments[0].userId },
      update: {
        courses: {
          connect: payments.map((payment) => ({ id: payment.courseId })),
        },
      },
      create: {
        userId: payments[0].userId,
        courses: {
          connect: payments.map((payment) => ({ id: payment.courseId })),
        },
      },
    }),
    await prisma.cart.deleteMany({ where: { userId } }),
  ]);

  // incremental revenue:
  const revenue = await prisma.revenue.findUnique({
    where: { userId },
  });

  if (!revenue) {
    await prisma.revenue.create({
      data: {
        amount,
        user: { connect: { id: userId } },
      },
    });
  } else {
    await prisma.revenue.update({
      where: { userId },
      data: {
        amount: revenue.amount + BigInt(amount),
      },
    });
  }
}
