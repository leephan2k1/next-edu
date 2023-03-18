import type { NextApiRequest } from 'next';
import type { NextApiResponseServerIO } from '~/types';
import { Server as ServerIO } from 'socket.io';
import type { Server as NetServer } from 'http';
import { prisma } from '~/server/db/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function socketio(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  // It means that socket server was already
  if (res.socket.server.io) {
    res.end();
    return;
  }

  if (!res.socket.server.io) {
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.socket.server.io.on('connection', (socket) => {
    const handleUpdateLearningTime = async () => {
      const learningProgress = await prisma.trackingProgress.findUnique({
        where: { socketId: socket.id },
      });

      if (learningProgress) {
        const diffTime = Math.abs(
          new Date().getSeconds() -
            new Date(learningProgress.learningSession).getSeconds(),
        );

        if (diffTime > 0) {
          const accum = learningProgress.timeInSecond + diffTime;

          await prisma.trackingProgress.update({
            where: { socketId: socket.id },
            data: {
              timeInSecond: accum,
            },
          });
        }
      }
    };

    socket.on('disconnect', async () => {
      await handleUpdateLearningTime();
    });

    socket.on('online', async (data) => {
      if (!data?.userId) return;

      await prisma.user.update({
        where: { id: data?.userId },
        data: {
          socketId: socket.id,
        },
      });
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket.on('start learning', async (data) => {
      await prisma.student.update({
        where: { userId: data?.userId },
        data: {
          trackingProgress: {
            upsert: {
              where: {
                userId_date: {
                  date: data?.date,
                  userId: data?.userId,
                },
              },
              update: {
                socketId: socket.id,
                learningSession: new Date(),
              },
              create: {
                socketId: socket.id,
                date: data?.date,
                userId: data?.userId,
                timeInSecond: 0,
              },
            },
          },
        },
      });
    });

    socket.on('stop learning', async () => {
      await handleUpdateLearningTime();
    });
  });

  res.end();
}
