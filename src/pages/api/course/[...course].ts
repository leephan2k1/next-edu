import { type NextApiRequest, type NextApiResponse } from 'next';
import type { CourseType } from '~/contexts/CourseContext';
import { prisma } from '../../../server/db/client';
import createCategory from '~/server/helper/createCategory';
import slug from 'slug';
import cleanTargetsAndRequirements from '~/server/helper/cleanTargetsAndRequirements';
// import { getVideoDurationInSeconds } from 'get-video-duration';

const course = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  const {
    category,
    name,
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
  } = body as CourseType;

  switch (method) {
    case 'POST':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const categoryDb = await createCategory(category);

      if (!categoryDb) return res.status(500).json({ message: 'Error' });

      // Clean everything before making new ones.
      await cleanTargetsAndRequirements(slug(name));

      //update course if non-exist:
      const coursePayload = {
        name,
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
      };

      // getVideoDurationInSeconds(
      //   'https://upcdn.io/12a1xxF/raw/uploads/2023/02/16/kyoto%20manga%20devlogs%20browse%20page-2M9C.mp4',
      // ).then((duration) => console.log('duration::: ', duration));

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
                    },
                    create: {
                      id: `${slug(name)}_${chapter.order}_${lecture.order}`,
                      title: lecture.title,
                      description: lecture.description,
                      isPreview: lecture.isPreview,
                      order: lecture.order,
                    },
                  })),
                },
              },
              create: {
                title: chapter.title,
                order: chapter.order,
                id: `${slug(name)}_${chapter.order}`,
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

      return res.status(200).json({ coursesResult });

    default:
      return res.status(404).json({ message: 'method invalidate' });
  }
};

export default course;
