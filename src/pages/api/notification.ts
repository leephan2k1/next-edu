import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const notification = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { body } = req;
    const { location, content, userId } = body;

    if (!location || !content || !userId) {
      return res.status(400).send({
        message: 'location, content or userId are required',
      });
    }

    // create notification record & find user's socketId:
    const [user] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: userId },
        select: { socketId: true },
      }),
      prisma.notification.create({
        data: {
          content,
          location,
          user: { connect: { id: userId } },
        },
      }),
    ]);

    // send real-time signal:
    res?.socket?.server?.io?.to(user?.socketId).emit('notification', 'trigger');
  }
};

export default notification;
