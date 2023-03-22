import { z } from 'zod';
import { publicProcedure, router, protectedProcedure } from '../trpc';
import type { WITHDRAWAL_STATUS } from '@prisma/client';

export const userRouter = router({
  findCoursesByInstructor: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.prisma.course.findMany({
      where: { instructor: { id: ctx.session.user.id } },
      select: {
        id: true,
        name: true,
        students: true,
        reviews: true,
        coursePrice: true,
        payments: {
          where: {
            status: 'SUCCESS',
            createdAt: {
              gt: new Date(new Date().getFullYear(), 0, 1),
              lt: new Date(new Date().getFullYear(), 11, 31),
            },
          },
          select: { id: true, createdAt: true },
        },
      },
    });

    return courses;
  }),

  findProgressTimeStatus: protectedProcedure.query(async ({ ctx }) => {
    const timesStatus = await ctx.prisma.trackingProgress.findMany({
      where: { userId: ctx.session.user.id },
    });

    return timesStatus;
  }),

  findEnrolledCourses: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.prisma.student.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            instructor: true,
            category: { select: { name: true } },
            slug: true,
            thumbnail: true,
            coursePrice: true,
          },
        },
      },
    });

    return courses;
  }),

  findPayments: protectedProcedure.query(async ({ ctx }) => {
    const payments = ctx.prisma.payment.findMany({
      where: { userId: ctx.session.user.id, status: 'SUCCESS' },
      include: {
        course: {
          select: {
            name: true,
            slug: true,
            instructor: true,
            thumbnail: true,
            coursePrice: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return payments;
  }),

  findRevenues: protectedProcedure.query(async ({ ctx }) => {
    const revenues = await ctx.prisma.revenue.findMany({
      where: { userId: ctx.session.user.id },
    });

    return revenues;
  }),

  findWithdrawals: protectedProcedure
    .input(
      z.object({
        status: z.string(),
        isAdmin: z.boolean().optional(),
        includeUser: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { status, isAdmin, includeUser } = input;

      const withdrawals = await ctx.prisma.withdrawal.findMany({
        where: {
          userId: isAdmin ? undefined : ctx.session.user.id,
          status: status as WITHDRAWAL_STATUS,
        },
        include: { transaction: true, user: !!includeUser },
        orderBy: { createdAt: 'desc' },
      });

      return withdrawals;
    }),

  approveWithdrawal: protectedProcedure
    .input(
      z.object({
        withdrawalsId: z.array(z.string()),
        status: z.union([
          z.literal('PENDING'),
          z.literal('SUCCESS'),
          z.literal('ERROR'),
          z.literal('CANCEL'),
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { withdrawalsId, status } = input;

      const [approveWithdrawalsStatus] = await Promise.allSettled(
        withdrawalsId.map(async (id) => {
          await ctx.prisma.withdrawal.update({
            where: { id },
            data: {
              status,
            },
          });
        }),
      );

      return approveWithdrawalsStatus?.value;
    }),

  withdrawMoney: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        bankCode: z.string(),
        bankAccount: z.string(),
        bankName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { amount, bankAccount, bankCode, bankName } = input;

      const newWithdrawal = await ctx.prisma.withdrawal.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          transaction: {
            create: {
              amount,
              bankAccount,
              bankCode,
              bankName,
            },
          },
        },
      });

      return newWithdrawal;
    }),

  deleteWithdrawal: protectedProcedure
    .input(z.object({ withdrawalId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { withdrawalId } = input;

      const deletedWithdrawal = await ctx.prisma.withdrawal.delete({
        where: { id: withdrawalId },
      });

      return deletedWithdrawal;
    }),

  addCOurseToCart: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { courseId } = input;

      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          cart: {
            create: {
              course: { connect: { id: courseId } },
            },
          },
        },
      });

      return user;
    }),

  deleteCourseFromCart: protectedProcedure
    .input(z.object({ cartId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { cartId } = input;

      const deletedCart = await ctx.prisma.cart.delete({
        where: { id: cartId },
      });

      return deletedCart;
    }),

  findCartByUser: protectedProcedure
    .input(z.object({ includeCourse: z.boolean() }))
    .query(async ({ ctx, input }) => {
      const { includeCourse } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          wishlist: true,
          cart: {
            include: {
              course: includeCourse
                ? {
                    select: {
                      slug: true,
                      instructor: true,
                      chapters: { include: { lectures: true } },
                      thumbnail: true,
                      name: true,
                      coursePrice: true,
                      courseLevel: true,
                    },
                  }
                : includeCourse,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      return user;
    }),

  addRating: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        rating: z.number(),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { content, rating, courseId } = input;

      const review = await ctx.prisma.review.create({
        data: {
          content,
          rating,
          author: { connect: { id: ctx.session.user.id } },
          Course: { connect: { id: courseId } },
        },
      });

      return review;
    }),

  deleteRating: protectedProcedure
    .input(z.object({ ratingId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { ratingId } = input;

      const deletedRating = await ctx.prisma.review.delete({
        where: { id: ratingId },
      });

      return deletedRating;
    }),

  findInstructor: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const instructor = await ctx.prisma?.user.findUnique({
        where: { id: userId },
        include: {
          bio: { include: { socialContacts: true } },
          Course: { select: { students: true, reviews: true } },
        },
      });

      return instructor;
    }),

  updateBio: protectedProcedure
    .input(
      z.object({
        specialist: z.string(),
        bioDescription: z.string(),
        socialContacts: z
          .array(z.object({ title: z.string(), url: z.string() }))
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { specialist, bioDescription, socialContacts } = input;

      try {
        //clear old bio & social contacts:
        await ctx.prisma.bio.delete({ where: { userId: ctx.session.user.id } });
      } catch (error) {}

      const userWithBio = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          bio: {
            create: {
              specialist,
              bioDescription,
              socialContacts: {
                create: socialContacts && socialContacts?.map((elem) => elem),
              },
            },
          },
        },
      });

      return userWithBio;
    }),

  findBio: protectedProcedure.query(async ({ ctx }) => {
    const userWithBio = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { bio: { include: { socialContacts: true } } },
    });

    return userWithBio;
  }),

  findWishlist: protectedProcedure
    .input(z.object({ includeCourse: z.boolean().optional() }))
    .query(async ({ input, ctx }) => {
      const { includeCourse } = input;

      const userWithWishlist = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          wishlist: {
            include: { course: !!includeCourse },
          },
        },
      });

      return userWithWishlist?.wishlist;
    }),

  addWishCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { courseId } = input;

      const userWithWishCourse = await ctx.prisma.wishlist.upsert({
        where: { courseId },
        update: {
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
        create: {
          courseId,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      return userWithWishCourse;
    }),

  deleteAllWishlist: protectedProcedure
    .input(z.object({ wishlistIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { wishlistIds } = input;

      const deletedWishlist = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          wishlist: {
            disconnect: wishlistIds.map((id) => ({ id })),
          },
        },
      });

      return deletedWishlist;
    }),

  deleteWishCourse: protectedProcedure
    .input(z.object({ wishlistId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { wishlistId } = input;

      const userWithoutWishCourse = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          wishlist: {
            disconnect: { id: wishlistId },
          },
        },
      });

      return userWithoutWishCourse;
    }),

  findUserInfo: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const { email } = input;

      const user = await ctx.prisma.user.findUnique({ where: { email } });

      return user;
    }),

  addNote: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        chapterId: z.string(),
        lectureId: z.string(),
        notchedAt: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { content, chapterId, lectureId, notchedAt } = input;

      const noteByUser = await ctx.prisma.note.create({
        data: {
          lectureId,
          content,
          notchedAt,
          chapterId,
          User: { connect: { id: ctx.session.user.id } },
        },
      });

      return noteByUser;
    }),

  updateNote: protectedProcedure
    .input(z.object({ content: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      const note = await ctx.prisma.note.update({
        where: { id },
        data: { content },
      });

      return note;
    }),

  deleteNote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const deletedNote = await ctx.prisma.note.delete({
        where: { id },
      });

      return deletedNote;
    }),

  findNotes: protectedProcedure
    .input(
      z.object({
        sort: z.union([z.literal('asc'), z.literal('desc')]),
        chapterId: z.string().optional(),
        lectureId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { chapterId, sort, lectureId } = input;

      const conditions = {};

      if (chapterId) Object.assign(conditions, { ...conditions, chapterId });

      if (lectureId) Object.assign(conditions, { ...conditions, lectureId });

      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session.user.id,
          ...conditions,
        },
        orderBy: { createdAt: sort },
      });

      return notes;
    }),

  addDiscussion: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        lectureId: z.string(),
        replyId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { content, lectureId, replyId } = input;

      const discussion = await ctx.prisma.discussion.create({
        data: {
          content,
          lecture: { connect: { id: lectureId } },
          author: { connect: { id: ctx.session.user.id } },
        },
      });

      if (replyId) {
        await ctx.prisma.discussion.update({
          where: { id: replyId },
          data: {
            replies: {
              connect: { id: discussion.id },
            },
          },
        });
      }

      return discussion;
    }),

  updateDiscussion: protectedProcedure
    .input(z.object({ content: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { content, id } = input;

      const discussion = await ctx.prisma.discussion.update({
        where: { id },
        data: {
          content,
        },
      });

      return discussion;
    }),

  deleteDiscussion: protectedProcedure
    .input(z.object({ discussionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { discussionId } = input;

      // idk how to delete 1-m relations in prisma, so i do it in query raw ?:b?
      const [deletedDiscussion] = await ctx.prisma.$transaction([
        ctx.prisma.$queryRaw`DELETE FROM Discussion WHERE id = ${discussionId}`,
        ctx.prisma.discussion.deleteMany({
          where: { parentDiscussionId: discussionId },
        }),
      ]);

      return deletedDiscussion;
    }),

  findDiscussions: publicProcedure
    .input(z.object({ lectureId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { lectureId } = input;

      const discussions = await ctx.prisma.discussion.findMany({
        where: { lectureId, parentDiscussionId: { equals: null } },
        include: {
          replies: {
            include: {
              author: { select: { name: true, image: true, id: true } },
            },
          },
          author: { select: { name: true, image: true, id: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return discussions;
    }),

  findNotifications: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return notifications;
  }),

  deleteNotifications: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { ids } = input;

      await ctx.prisma.$transaction(
        ids.map((id) => {
          return ctx.prisma.notification.delete({ where: { id } });
        }),
      );
    }),

  addReminder: protectedProcedure
    .input(
      z.object({
        weekly: z.array(z.string()),
        message: z.string(),
        time: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { weekly, message, time } = input;

      const [reminders] = await ctx.prisma.$transaction(
        weekly.map((d) => {
          return ctx.prisma.reminder.upsert({
            where: {
              time_userId_date: {
                date: d,
                time,
                userId: ctx.session.user.id,
              },
            },
            update: {
              date: d,
              time,
              message,
            },
            create: {
              date: d,
              time,
              message,
              userId: ctx.session.user.id,
            },
          });
        }),
      );

      return reminders;
    }),

  findReminders: protectedProcedure.query(async ({ ctx }) => {
    const reminders = await ctx.prisma.reminder.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return reminders;
  }),

  deleteReminder: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const deletedReminder = await ctx.prisma.reminder.delete({
        where: { id },
      });

      return deletedReminder;
    }),
});
