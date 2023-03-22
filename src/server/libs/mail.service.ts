import nodemailer from 'nodemailer';
import { env } from '~/env/server.mjs';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const nodemailerConfig = JSON.parse(String(env.NODEMAILER_CONFIG));

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return await transporter.sendMail({
    from: nodemailerConfig?.auth?.user,
    ...data,
  });
};
