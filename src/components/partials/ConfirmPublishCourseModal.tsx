import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Dispatch, SetStateAction } from 'react';
import useCourse from '~/contexts/CourseContext';
import { FaceFrownIcon } from '@heroicons/react/24/solid';
import { If, Then, Else } from 'react-if';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface ConfirmPublishCourseModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmPublishCourseModal({
  isOpen,
  setIsOpen,
}: ConfirmPublishCourseModalProps) {
  const router = useRouter();
  const courseCtx = useCourse();

  const [missingFields, setMissingFields] = useState<string[]>([]);

  const { mutate: publishCourse } = trpc.course.publishCourse.useMutation();

  const handlePublishCourse = () => {
    if (router.query?.slug && !Array.isArray(router.query?.slug)) {
      publishCourse({ published: true, slug: router.query.slug });
    } else {
      toast.error('Opps! Có gì đó không đúng?');
    }
  };

  useEffect(() => {
    const mistakeFields: string[] = [];

    if (!courseCtx?.course?.thumbnail) {
      mistakeFields.push('Thiếu ảnh đại diện khoá học');
    }

    if (!courseCtx?.course?.briefDescription) {
      mistakeFields.push('Thiếu mô tả ngắn');
    }

    if (!courseCtx?.course?.detailDescription) {
      mistakeFields.push('Thiếu mô chi tiết');
    }

    if (
      courseCtx?.course?.courseTargets &&
      courseCtx?.course?.courseTargets?.length < 4
    ) {
      mistakeFields.push('Cần ít nhất 4 mục tiêu khoá học');
    }

    if (courseCtx?.course?.chapters.length === 0) {
      mistakeFields.push('Khoá học cần ít nhất 1 chương');
    }

    if (
      courseCtx?.course?.chapters &&
      !courseCtx?.course?.chapters.some((chapter) => {
        return chapter.lectures?.some((lecture) => lecture.isPreview);
      })
    ) {
      mistakeFields.push('Khoá học cần ít 1 bài học được xem trước (preview)');
    }

    setMissingFields(mistakeFields);

    return () => {
      setMissingFields([]);
    };
  }, [courseCtx]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[400]" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto text-gray-600 dark:text-white/80">
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
                <Dialog.Panel className="flex h-[80vh] w-[50rem] transform flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  shadow-xl transition-all dark:bg-dark-background md:h-[65vh] lg:h-[80vh]">
                  <div>
                    <Dialog.Title
                      as="div"
                      className="my-4 mx-4 flex items-center justify-between md:my-6"
                    >
                      <h2 className="text-2xl font-medium uppercase leading-6 md:text-3xl">
                        Xác nhận phát hành khoá học
                      </h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-3 md:p-2"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </Dialog.Title>

                    <If condition={missingFields.length > 0}>
                      <Then>
                        <div className="flex flex-col">
                          <h4 className="flex items-center space-x-4 text-rose-500">
                            <FaceFrownIcon className="h-8 w-8" />{' '}
                            <span>
                              Bạn chưa đủ điều kiện để phát hành khoá học!
                            </span>
                          </h4>

                          <p className="my-4">
                            Hãy bổ sung các trường sau còn thiếu để hoàn tất
                            việc phát hành:
                          </p>

                          <ul className="list-inside list-disc space-y-4">
                            {missingFields &&
                              missingFields.length > 0 &&
                              missingFields.map((missingField, idx) => {
                                return <li key={idx}>{missingField}</li>;
                              })}
                          </ul>
                        </div>
                      </Then>
                      <Else>
                        <h4 className="my-4">
                          Khi đồng ý phát hành, có nghĩa bạn đã đồng ý các điều
                          sau:
                        </h4>
                        <ul className="my-6 list-inside list-decimal space-y-4">
                          <li>
                            Khoá học sẽ được lên danh sách chờ phê duyệt, bạn
                            vẫn có thể chỉnh sửa trong giai đoạn này.
                          </li>
                          <li>
                            Khoá học của bạn có thể bị từ chối phát hành nếu có
                            nội dung không phù hợp và vi phạm bản quyền.
                          </li>
                          <li>
                            Không được có nội dung so sánh với các khoá học
                            khác.
                          </li>
                          <li>
                            Bạn phải có trách nhiệm hỗ trợ người học sau khi
                            khoá học có người đăng ký.
                          </li>
                          <li>
                            Đối với khoá học có phí. Số tiền sẽ được cộng vào
                            tài khoản và có thể rút về thủ công.
                          </li>
                        </ul>
                      </Else>
                    </If>
                  </div>

                  <div className="flex w-full items-center justify-end">
                    <button
                      onClick={() => {
                        if (missingFields.length > 0) {
                          setIsOpen(false);
                        } else {
                          handlePublishCourse();
                        }
                      }}
                      className="smooth-effect rounded-2xl border border-gray-500 py-3 px-4 hover:border-green-300 hover:bg-green-300 dark:border-white dark:hover:text-black"
                    >
                      {missingFields.length > 0
                        ? 'Đã hiểu'
                        : 'Đồng ý và phát hành'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
