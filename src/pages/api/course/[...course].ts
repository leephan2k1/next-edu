import { type NextApiRequest, type NextApiResponse } from 'next';
import type { CourseType } from '~/contexts/CourseContext';
import { prisma } from '../../../server/db/client';
import createCategory from '~/server/helper/createCategory';
import slug from 'slug';
import cleanTargetsAndRequirements from '~/server/helper/cleanTargetsAndRequirements';
import cleanResourcesByCourse from '~/server/helper/cleanResourcesByCourse';
import { computeVideoDuration } from '~/server/helper/computeVideoDuration';
import exclude from '~/server/helper/excludeFields';

const course = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  const {
    category,
    name,
    thumbnail,
    briefDescription,
    publishMode,
    courseState,
    coursePrice,
    courseLevel,
    password,
    meetingPlatform,
    detailDescription,
    userId,
    chapters,
    courseRequirements,
    courseTargets,
    published,
  } = body as CourseType;

  switch (method) {
    case 'POST':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const categoryDb = await createCategory(category);

      if (!categoryDb) return res.status(500).json({ message: 'Error' });

      // Clean everything before making new ones.
      await Promise.allSettled([
        await cleanTargetsAndRequirements(slug(name)),
        await cleanResourcesByCourse(slug(name)),
      ]);

      //update course if non-exist:
      const coursePayload = {
        name,
        thumbnail,
        slug: slug(name),
        briefDescription,
        category: { connect: { id: categoryDb.id } },
        subCategory: category?.subCategory,
        instructor: { connect: { id: userId } },
        courseTargets: {
          create: courseTargets
            ?.filter((target) => target !== '')
            ?.map((target) => ({ content: target, courseSlug: slug(name) })),
        },
        courseRequirements: {
          create: courseRequirements
            ?.filter((target) => target !== '')
            ?.map((requirement) => ({
              content: requirement,
              courseSlug: slug(name),
            })),
        },
        meetingPlatform,
        detailDescription,
        password,
        publishMode,
        courseState,
        coursePrice: Number(coursePrice),
        courseLevel,
        published,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const newChaptersWithDuration = await computeVideoDuration(chapters);

      Object.assign(chapters, newChaptersWithDuration);

      const course = await prisma.course.upsert({
        where: {
          name,
        },
        update: {
          ...coursePayload,
          chapters: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            upsert: chapters.map((chapter) => ({
              where: { id: `${slug(name)}_${chapter.order}` },
              update: {
                title: chapter.title,
                order: chapter.order,
                lectures: {
                  upsert: chapter.lectures?.map((lecture) => ({
                    where: {
                      id: `${slug(name)}_${chapter.order}_${lecture.order}`,
                    },
                    update: {
                      title: lecture.title,
                      description: lecture.description,
                      isPreview: lecture.isPreview,
                      order: lecture.order,
                      resources: {
                        create: lecture.resources.map((resource) => ({
                          ...resource,
                          courseSlug: slug(name),
                        })),
                      },
                    },
                    create: {
                      id: `${slug(name)}_${chapter.order}_${lecture.order}`,
                      title: lecture.title,
                      description: lecture.description,
                      isPreview: lecture.isPreview,
                      order: lecture.order,
                      resources: {
                        create: lecture.resources.map((resource) => ({
                          ...resource,
                          courseSlug: slug(name),
                        })),
                      },
                    },
                  })),
                },
              },
              create: {
                title: chapter.title,
                order: chapter.order,
                id: `${slug(name)}_${chapter.order}`,
                lectures: {
                  create: chapter.lectures?.map((lecture) => ({
                    id: `${slug(name)}_${chapter.order}_${lecture.order}`,
                    title: lecture.title,
                    description: lecture.description,
                    isPreview: lecture.isPreview,
                    order: lecture.order,
                    resources: {
                      create: lecture.resources.map((resource) => ({
                        ...resource,
                        courseSlug: slug(name),
                      })),
                    },
                  })),
                },
              },
            })),
          },
        },
        create: {
          ...coursePayload,
          chapters: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            create: chapters.map((chapter) => ({
              title: chapter.title,
              order: chapter.order,
              id: `${slug(name)}_${chapter.order}`,
              lectures: {
                create: chapter.lectures?.map((lecture) => ({
                  id: `${slug(name)}_${chapter.order}_${lecture.order}`,
                  title: lecture.title,
                  description: lecture.description,
                  isPreview: lecture.isPreview,
                  order: lecture.order,
                  resources: {
                    create: lecture.resources.map((resource) => ({
                      ...resource,
                      courseSlug: slug(name),
                    })),
                  },
                })),
              },
            })),
          },
        },
      });

      return res.status(201).json({ message: 'success', course });
    case 'GET':
      const { course: courseParams } = query as { course: string[] };

      if (!Array.isArray(courseParams) && !courseParams[0]) throw new Error();

      const coursesResult = await prisma.course.findUnique({
        where: { name: courseParams[0] },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const coursesResultWithoutPassword = exclude(coursesResult, ['password']);

      return res
        .status(200)
        .json({ coursesResult: coursesResultWithoutPassword });

    default:
      return res.status(404).json({ message: 'method invalidate' });
  }
};

export default course;
