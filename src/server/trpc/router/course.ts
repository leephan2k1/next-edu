import { z } from 'zod';
import exclude from '~/server/helper/excludeFields';
import {
  MAPPING_COURSE_STATE_LANGUAGE,
  MAPPING_LEVEL_LANGUAGE,
} from '~/constants';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const courseRouter = router({
  findAnalysisData: protectedProcedure.query(async ({ ctx }) => {
    const [
      numberCourses,
      numberStudents,
      numberResources,
      totalCourses,
      totalPaidCourse,
      topPaidCourse,
    ] = await ctx.prisma.$transaction([
      ctx.prisma.course.count(),
      ctx.prisma.student.count(),
      ctx.prisma.resource.count(),
      ctx.prisma.course.findMany({
        where: { students: { some: { id: { not: undefined } } } },
        select: {
          students: true,
          category: true,
        },
      }),
      ctx.prisma.course.findMany({
        where: { payments: { some: { id: { not: undefined } } } },
        select: {
          coursePrice: true,
          payments: {
            where: { status: 'SUCCESS' },
            select: { id: true, createdAt: true },
          },
        },
      }),
      ctx.prisma.course.findMany({
        where: { coursePrice: { not: 0 } },
        select: { id: true, name: true, payments: true },
        orderBy: { payments: { _count: 'desc' } },
        take: 10,
      }),
    ]);

    return {
      numberCourses,
      numberStudents,
      numberResources,
      totalCourses,
      totalPaidCourse,
      topPaidCourse,
    };
  }),

  findAllReviews: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { courseId } = input;

      const reviews = await ctx.prisma.review.findMany({
        where: { courseId },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });

      return reviews;
    }),

  checkCoursePassword: publicProcedure
    .input(z.object({ password: z.string(), courseSlug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { password, courseSlug } = input;

      const courseWithPassword = await ctx.prisma.course.findUnique({
        where: { slug: courseSlug },
        select: { password: true },
      });

      if (password === courseWithPassword?.password) {
        return true;
      }

      return false;
    }),

  findCoursesByOwner: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      const courses = await ctx.prisma.course.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          slug: true,
          verified: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return { message: 'success', courses };
    }),

  findAnnouncements: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { courseId } = input;

      const announcements = await ctx.prisma.announcement.findMany({
        where: { courseId },
        orderBy: { createdAt: 'desc' },
      });

      return announcements;
    }),

  deleteAnnouncement: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const deletedAnnouncement = await ctx.prisma.announcement.delete({
        where: { id },
      });

      return deletedAnnouncement;
    }),

  updateAnnouncement: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      const updatedAnnouncement = await ctx.prisma.announcement.update({
        where: { id },
        data: { content },
      });

      return updatedAnnouncement;
    }),

  createAnnouncement: protectedProcedure
    .input(z.object({ content: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { content, id } = input;

      const courseWithAnnouncement = await ctx.prisma.course.update({
        where: { id },
        data: {
          announcements: {
            create: {
              content,
            },
          },
        },
      });

      return courseWithAnnouncement;
    }),

  findWaitingListCourses: protectedProcedure
    .input(
      z.object({
        verified: z.union([
          z.literal('APPROVED'),
          z.literal('PENDING'),
          z.literal('REJECT'),
        ]),
        published: z.boolean(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { published, verified, userId } = input;

      const conditions = { published, verified };

      if (userId) {
        Object.assign(conditions, { ...conditions, userId });
      }

      const courses = await ctx.prisma.course.findMany({
        where: conditions,
        include: {
          courseTargets: { distinct: ['content'] },
          courseRequirements: { distinct: ['content'] },
          chapters: {
            include: {
              lectures: {
                include: {
                  resources: true,
                  discussions: true,
                  learnedBy: true,
                },
              },
            },
          },
          reviews: true,
          students: true,
          instructor: true,
          category: true,
        },
        orderBy: { updatedAt: 'asc' },
      });

      return courses;
    }),

  verifyCourse: protectedProcedure
    .input(
      z.object({
        verified: z.union([
          z.literal('APPROVED'),
          z.literal('PENDING'),
          z.literal('REJECT'),
        ]),
        courses: z.array(
          z.object({ courseId: z.string(), instructorId: z.string() }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { courses, verified } = input;

      const [coursesRes] = await ctx.prisma.$transaction(
        courses.map((c) => {
          return ctx.prisma.course.update({
            where: { id: c.courseId },
            data: {
              verified,
              students: { connect: [{ userId: c.instructorId }] },
            },
          });
        }),
      );

      return coursesRes;
    }),

  enrollCourse: protectedProcedure
    .input(z.object({ slug: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug, userId } = input;

      const student = await ctx.prisma.student.upsert({
        where: { userId },
        update: { courses: { connect: [{ slug }] } },
        create: {
          userId,
          courses: { connect: [{ slug }] },
        },
      });

      return student;
    }),

  publishCourse: protectedProcedure
    .input(z.object({ published: z.boolean(), slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug, published } = input;

      const course = await ctx.prisma.course.update({
        where: { slug },
        data: { published },
      });

      return course;
    }),

  findCourseBySlug: publicProcedure
    .input(z.object({ slug: z.string(), userId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { slug, userId } = input;

      const course = await ctx.prisma.course.findUnique({
        where: { slug },
        include: {
          courseTargets: { distinct: ['content'] },
          courseRequirements: { distinct: ['content'] },
          chapters: {
            include: {
              lectures: {
                include: {
                  resources: true,
                  discussions: true,
                  learnedBy: true,
                },
              },
            },
          },
          reviews: {
            orderBy: { createdAt: 'desc' },
            take: 4,
            include: { author: true },
          },
          students: true,
          instructor: true,
          category: true,
        },
      });

      //the owner needs to get the password
      if (course && userId === course.userId) {
        return course;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const courseWithoutPassword = exclude(course, ['password']);

      return courseWithoutPassword;
    }),

  findCoursesByName: publicProcedure
    .input(z.object({ name: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { name, limit } = input;

      const courses = await ctx.prisma.course.findMany({
        where: {
          name: {
            search: `*${name}*`,
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          instructor: true,
          thumbnail: true,
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return courses;
    }),
  findCoursesByFilters: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        subCategory: z.string().optional(),
        sortBy: z.string().optional(),
        object: z.string().optional(),
        price: z.string().optional(),
        courseState: z.string().optional(),
        limit: z.number(),
        page: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        category,
        courseState,
        sortBy,
        object,
        price,
        limit,
        page,
        subCategory,
      } = input;

      const whereConditions = new Map();
      const sortCondition = new Map();

      if (subCategory && subCategory !== 'Tất cả') {
        whereConditions.set('subCategory', subCategory);
      }

      if (category && category !== 'Tất cả')
        whereConditions.set('category', { name: category });

      if (courseState) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const _courseState = MAPPING_COURSE_STATE_LANGUAGE[courseState]; // -> mapping to english value
        whereConditions.set('courseState', _courseState);
      }

      if (object) {
        // -> mapping to english value:
        const _object = MAPPING_LEVEL_LANGUAGE[object]; // -> mapping to english value

        whereConditions.set('courseLevel', _object);
      }

      if (price) {
        const stringPrice = price.toLowerCase();

        if (stringPrice === 'miễn phí') {
          whereConditions.set('coursePrice', 0);
        }
        if (stringPrice === 'có phí') {
          whereConditions.set('coursePrice', { gt: 0 });
        }
      }

      if (sortBy) {
        const sort_by = sortBy.toLowerCase();
        if (sort_by === 'mới nhất') {
          sortCondition.set('createdAt', 'desc');
        }

        if (sort_by === 'đánh giá nhiều') {
          sortCondition.set('reviews', { _count: 'desc' });
          whereConditions.set('reviews', { some: { id: { not: undefined } } });
        }

        if (sort_by === 'mua nhiều') {
          sortCondition.set('payments', { _count: 'desc' });
          whereConditions.set('payments', { some: { id: { not: undefined } } });
        }

        if (sort_by === 'được ghi danh nhiều') {
          sortCondition.set('students', { _count: 'desc' });
          whereConditions.set('students', { some: { id: { not: undefined } } });
        }
      }

      // ignore private course:
      whereConditions.set('publishMode', 'PUBLIC');
      // ignore pending apprev:
      whereConditions.set('verified', 'APPROVED');

      const [totalRecords, courses] = await ctx.prisma.$transaction([
        ctx.prisma.course.count({ where: Object.fromEntries(whereConditions) }),
        ctx.prisma.course.findMany({
          where: Object.fromEntries(whereConditions),
          select: {
            id: true,
            name: true,
            slug: true,
            instructor: true,
            thumbnail: true,
            coursePrice: true,
          },
          orderBy: Object.fromEntries(sortCondition),
          take: limit,
          skip: (Number(page) - 1) * limit,
        }),
      ]);

      return { courses, totalPages: Math.ceil(totalRecords / limit) };
    }),
});
