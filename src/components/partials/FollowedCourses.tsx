import { memo } from 'react';
import ModernCourseCard from '../shared/ModernCourseCard';
import Loading from '../buttons/Loading';
import { trpc } from '~/utils/trpc';
import { If, Then, Else } from 'react-if';
import type { CourseType } from '~/types';
import { PATHS } from '~/constants';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function FollowedCourses() {
  const {
    data: wishlist,
    isLoading,
    refetch,
  } = trpc.user.findWishlist.useQuery({
    includeCourse: true,
  });

  const { mutate: deleteAllWishlist, status: deleteAllWishlistStatus } =
    trpc.user.deleteAllWishlist.useMutation();

  useEffect(() => {
    if (deleteAllWishlistStatus === 'success') {
      toast.success('Huỷ yêu thích thành công!');
      refetch();
    }
  }, [deleteAllWishlistStatus]);

  return (
    <section className="w-full">
      <button
        disabled={deleteAllWishlistStatus === 'loading'}
        onClick={() => {
          if (wishlist) {
            const cf = window.confirm('Quyết định huỷ yêu thích tất cả?');

            if (cf)
              deleteAllWishlist({ wishlistIds: wishlist?.map((e) => e.id) });
          }
        }}
        className="smooth-effect absolute-center my-4 min-h-[3.8rem] w-fit min-w-[13.2rem] rounded-xl bg-rose-400 p-4 text-xl text-white"
      >
        {deleteAllWishlistStatus === 'loading' ? (
          <Loading />
        ) : (
          'Huỷ yêu thích tất cả'
        )}
      </button>

      <If condition={isLoading}>
        <Then>
          <div className="absolute-center min-h-[10rem] w-full">
            <Loading />
          </div>
        </Then>
        <Else>
          <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {wishlist &&
              wishlist.length > 0 &&
              wishlist.map((item) => {
                return (
                  <ModernCourseCard
                    key={item.course.id}
                    path={`/${PATHS.COURSE}/${item.course.slug}`}
                    course={item.course as CourseType}
                  />
                );
              })}
            {/* <li>

        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li> */}
          </ul>
        </Else>
      </If>
    </section>
  );
}

export default memo(FollowedCourses);
