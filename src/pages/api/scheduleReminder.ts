import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '~/server/db/client';
import dateFormat from 'dateformat';
import { render } from '@react-email/render';
import ReminderEmail from 'emails/ReminderTemplate';
import { sendEmail } from '~/server/libs/mail.service';
import { dInVietnamese } from '~/constants';
import { env } from '~/env/server.mjs';

const scheduleReminder = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers['x-api-key'];
  if (!key || typeof key !== 'string' || key !== env.CRON_API_KEY) {
    return res.status(401).end();
  }

  const currentDate = new Date();
  const hours = dateFormat(currentDate, 'HH');
  const date = dateFormat(currentDate, 'ddd');

  // get all records that have a schedule in current time:
  const reminders = await prisma.reminder.findMany({
    where: { timeInHour: hours, date },
    select: {
      time: true,
      date: true,
      message: true,
      user: { select: { email: true } },
    },
  });

  // send to all users
  if (reminders.length > 0) {
    await Promise.allSettled(
      reminders.map(async (r) => {
        return await sendEmail({
          to: r.user.email as string,
          subject: 'Bạn có lời nhắc từ Next Edu',
          html: render(
            ReminderEmail({
              time: `${r.time} ${dInVietnamese.get(r.date)}`,
              message: String(r.message),
            }),
          ),
        });
      }),
    );
  }

  res
    .status(200)
    .json({ sendingCost: new Date().getSeconds() - currentDate.getSeconds() });
};

export default scheduleReminder;
