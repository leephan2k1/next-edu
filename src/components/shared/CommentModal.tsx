import { useAtom } from 'jotai';
import { Fragment, memo, useMemo } from 'react';
import { BsDot } from 'react-icons/bs';
import { useElementSize, useMediaQuery } from 'usehooks-ts';
import { commentModalState } from '~/atoms/commentModal';
import { trpc } from '~/utils/trpc';
import Rating from '../courses/Rating';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import type { Review } from '@prisma/client';
import Loading from '../buttons/Loading';
import PercentRating from '../courses/PercentRating';

interface CommentModalProps {
  courseId?: string;
}

function getPercentHelper(reviews: Review[], star: number, total: number) {
  const totalSpecStar = reviews.filter((rv) => rv.rating === star);

  return Math.trunc((totalSpecStar.length / total) * 100);
}

function CommentModal({ courseId }: CommentModalProps) {
  const [containerRef, { height: hContainer }] = useElementSize();
  const [headerContainerRef, { height: hHeader }] = useElementSize();
  const [isOpen, setIsOpen] = useAtom(commentModalState);
  const matchesMobile = useMediaQuery('(max-width: 768px)');

  const {
    status,
    data: reviews,
    refetch,
  } = trpc.course.findAllReviews.useQuery(
    { courseId: courseId as string },
    { enabled: !!courseId && isOpen },
  );

  const refetchAllReviews = () => {
    refetch();
  };

  const ratingAvg = useMemo(() => {
    if (!reviews) return 0;

    return (
      Math.trunc(
        reviews?.reduce((acc, rv) => {
          return acc + rv.rating;
        }, 0),
      ) / reviews?.length
    );
  }, [reviews]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-[3%] left-1/2 -translate-x-1/2 overflow-y-auto text-gray-600 dark:text-white/80">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={containerRef}
                  className="h-[80vh] w-screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-background md:w-[90vw] lg:w-[50vw]"
                >
                  {status === 'loading' ? (
                    <div className="full-size absolute-center">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="div"
                        className="flex items-center justify-between text-2xl font-medium leading-6 md:p-4 md:text-4xl lg:text-3xl"
                      >
                        <div
                          ref={headerContainerRef}
                          className="flex items-center justify-center"
                        >
                          <h1 className="flex items-center space-x-3">
                            <StarIcon className="inline h-8 w-8 text-yellow-500" />
                            <span>{ratingAvg || 0} đánh giá</span>
                          </h1>

                          <BsDot className="h-8 w-8" />

                          <h1>
                            {new Intl.NumberFormat('en', {
                              notation: 'compact',
                            }).format(reviews?.length || 0)}{' '}
                            Lượt đánh giá
                          </h1>
                        </div>

                        <button
                          onClick={() => setIsOpen(false)}
                          className="btn-follow-theme btn-square btn"
                        >
                          <XMarkIcon className="h-8 w-8" />
                        </button>
                      </Dialog.Title>

                      <Dialog.Description className="grid grid-cols-1 md:grid-cols-3">
                        <div className="col-span-1 flex flex-col py-2 px-4">
                          <PercentRating
                            fiveStars={getPercentHelper(
                              reviews || [],
                              5,
                              reviews?.length || 1,
                            )}
                            fourStars={getPercentHelper(
                              reviews || [],
                              4,
                              reviews?.length || 1,
                            )}
                            threeStars={getPercentHelper(
                              reviews || [],
                              3,
                              reviews?.length || 1,
                            )}
                            twoStars={getPercentHelper(
                              reviews || [],
                              2,
                              reviews?.length || 1,
                            )}
                            oneStar={getPercentHelper(
                              reviews || [],
                              1,
                              reviews?.length || 1,
                            )}
                          />
                        </div>

                        <div
                          style={{
                            height: `${
                              matchesMobile
                                ? hContainer - hHeader - 140
                                : hContainer - hHeader - 50
                            }px`,
                          }}
                          className="col-span-2 mt-6 overflow-y-scroll px-2 md:mt-0"
                        >
                          <div className="w-full">
                            <ul className="flex flex-col space-y-4">
                              {reviews &&
                                reviews.length > 0 &&
                                reviews.map((rv) => {
                                  return (
                                    <Rating
                                      key={rv.id}
                                      review={rv}
                                      refetchAllReviews={refetchAllReviews}
                                    />
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </Dialog.Description>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default memo(CommentModal);
