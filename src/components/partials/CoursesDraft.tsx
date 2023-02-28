import { memo } from 'react';
import { trpc } from '~/utils/trpc';
import { useSession } from 'next-auth/react';
import Loading from '~/components/buttons/Loading';
import toast from 'react-hot-toast';
import { PATHS } from '~/constants';
import { useRouter } from 'next/router';

function CoursesDraftItem({
  order,
  name,
  slug,
  createAt,
  updateAt,
}: {
  order: number;
  name: string;
  slug: string;
  createAt: Date;
  updateAt: Date;
}) {
  const router = useRouter();

  const handleEditCourse = () => {
    router.push(`${PATHS.EDIT_COURSE}?slug=${slug}`);
  };

  return (
    <tr
      onClick={handleEditCourse}
      className="smooth-effect cursor-pointer rounded-2xl odd:bg-slate-300 hover:text-sky-600 odd:dark:bg-dark-background hover:dark:text-sky-400"
    >
      <th className="px-4">{order}</th>
      <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">{name}</td>
      <td className="text-center">{createAt.toLocaleDateString('vi-VI')}</td>
      <td className="text-center">{updateAt.toLocaleDateString('vi-VI')}</td>
      <td className={`text-center`}>{slug}</td>
    </tr>
  );
}

function CoursesDraft() {
  const { data: session } = useSession();

  const { data, isLoading, isError } = trpc.course.findCoursesByOwner.useQuery(
    { userId: session?.user?.id as string },
    { enabled: !!session?.user?.id },
  );

  if (isError) {
    toast.error('Lỗi! Không tìm thấy khoá học đang soạn');
    return <div></div>;
  }

  if (isLoading) {
    return (
      <div className="absolute-center w-full overflow-hidden">
        <Loading />
      </div>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <p className="my-4 italic">Bạn chưa soạn khoá học nào!</p>;
  }

  return (
    <table className="table-auto">
      <thead className="select-none">
        <tr>
          <th></th>
          <th className="whitespace-nowrap  px-4 py-3">Tên khoá học</th>
          <th className="whitespace-nowrap  px-4 py-3">Ngày tạo</th>
          <th className="whitespace-nowrap  px-4 py-3">Ngày cập nhật</th>
          <th className="whitespace-nowrap  px-4 py-3">Đường dẫn khoá học</th>
        </tr>
      </thead>
      <tbody className="rounded-xl">
        {data &&
          data.courses.length > 0 &&
          data.courses.map((course, order) => {
            return (
              <CoursesDraftItem
                key={course.id}
                name={course.name}
                createAt={course.createdAt}
                order={order + 1}
                slug={course.slug || ''}
                updateAt={course.updatedAt}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default memo(CoursesDraft);
