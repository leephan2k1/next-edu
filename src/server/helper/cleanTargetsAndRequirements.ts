import { prisma } from '../../server/db/client';

// need to clean up course 1-n targets because Prisma doesn't support upsetting many:
// https://stackoverflow.com/questions/70821501/how-to-upsert-many-fields-in-prisma-orm
export default async function cleanTargetsAndRequirements(courseSlug: string) {
  try {
    await Promise.allSettled([
      await prisma.courseTarget.deleteMany({ where: { courseSlug } }),
      await prisma.courseRequirement.deleteMany({ where: { courseSlug } }),
    ]);

    return true;
  } catch (error) {
    console.error('cleanTargets error: ', error);
    return false;
  }
}
