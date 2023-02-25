import { prisma } from '../../server/db/client';

export default async function cleanResourcesByCourse(courseSlug: string) {
  try {
    await prisma.resource.deleteMany({ where: { courseSlug } });

    return true;
  } catch (error) {
    return false;
  }
}
