import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { body } = req;
    const { chatSessionId, content, userIdOne, userIdTwo } = body;

    if (!chatSessionId || !content || !userIdOne || !userIdTwo) {
      return res.status(400).send({
        message: 'chatSessionId, content, userIdOne and userIdTwo are required',
      });
    }

    try {
      // create message & find socketId userTwo
      const [message, userTwo] = await prisma.$transaction([
        prisma.message.create({
          data: {
            content,
            chatSession: { connect: { id: chatSessionId } },
            user: { connect: { id: userIdOne } },
          },
        }),
        prisma.user.findUnique({
          where: { id: userIdTwo },
          select: { socketId: true },
        }),
      ]);

      // send real-time message:
      res?.socket?.server?.io
        ?.to(userTwo?.socketId)
        .emit('new-message', {
          content,
          createdAt: new Date(),
          userIdOne,
          chatSessionId,
        });

      return res.status(201).json({ message });
    } catch (error) {
      return res.status(500).end();
    }
  }
};

export default chat;
