import { prisma } from '../db/client';

interface handlePaymentSuccessParams {
  paymentGId: string;
  orderId: string;
  amount: number;
}

export default async function handlePaymentSuccess({
  paymentGId,
  orderId,
}: handlePaymentSuccessParams) {
  //update & find payment table:
  const [paymentsWithResult] = await Promise.allSettled([
    await prisma.payment.findMany({
      where: { paymentGId },
      include: { course: { include: { instructor: true } } },
    }),
    await prisma.payment.updateMany({
      where: { paymentGId },
      data: { orderId, status: 'SUCCESS' },
    }),
  ]);

  const payments = paymentsWithResult?.value;
  const userId = payments[0].userId;

  // delete all records of cart & enroll course;
  await Promise.allSettled([
    await prisma.student.upsert({
      where: { userId: payments[0].userId },
      update: {
        courses: {
          connect: payments.map((payment) => ({ id: payment.courseId })),
        },
      },
      create: {
        userId: payments[0].userId,
        courses: {
          connect: payments.map((payment) => ({ id: payment.courseId })),
        },
      },
    }),
    await prisma.cart.deleteMany({ where: { userId } }),
  ]);

  // create revenues for instructors:
  await Promise.all(
    payments.map(async (payment) => {
      await prisma.revenue.create({
        data: {
          amount: BigInt(payment.course.coursePrice),
          user: { connect: { id: payment.course.instructor.id } },
        },
      });
    }),
  );
}
