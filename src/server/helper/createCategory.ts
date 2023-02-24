import { prisma } from '../../server/db/client';

export default async function createCategory({
  name,
  subCategory,
}: {
  name: string;
  subCategory: string;
}) {
  try {
    //update category if non-exist:
    const parentCategory = await prisma.category.upsert({
      where: {
        name,
      },
      update: {
        name,
        subCategories: {
          upsert: [
            {
              where: { name: subCategory },
              update: { name: subCategory },
              create: { name: subCategory },
            },
          ],
        },
      },
      create: {
        name,
        subCategories: {
          create: [{ name: subCategory }],
        },
      },
    });

    return parentCategory;
  } catch (error) {
    console.error('createCategory error: ', error);
    return null;
  }
}
