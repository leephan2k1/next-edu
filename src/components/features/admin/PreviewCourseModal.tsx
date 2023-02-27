import Image from 'next/image';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  MAPPING_COURSE_STATE_LANGUAGE,
  MAPPING_PUBLISH_MODE_LANGUAGE,
  MAPPING_LEVEL_LANGUAGE,
} from '~/constants';
import type { Dispatch, SetStateAction } from 'react';
import type { CourseType } from '~/types';

interface PreviewCourseModalProps {
  course: CourseType | null;
  openPreviewModal: boolean;
  setOpenPreviewModal: Dispatch<SetStateAction<boolean>>;
}

export default function PreviewCourseModal({
  course,
  openPreviewModal,
  setOpenPreviewModal,
}: PreviewCourseModalProps) {
  return (
    <>
      <Transition appear show={openPreviewModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[400]"
          onClose={setOpenPreviewModal}
        >
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
                <Dialog.Panel className="flex h-[85vh] w-[60rem] transform flex-col overflow-hidden overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-background md:h-[75vh] lg:h-[90vh]">
                  <Dialog.Title
                    as="div"
                    className="m-4 flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-medium uppercase leading-6 md:text-3xl">
                      Xem trước khoá học
                    </h2>
                    <button
                      onClick={() => setOpenPreviewModal(false)}
                      className="p-3 md:p-2"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Title>

                  <div className="fex w-full flex-col space-y-6">
                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Tên khoá học:</h2>
                      <p>{course?.name}</p>
                    </div>
                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Danh mục:</h2>
                      <p>
                        <span>{course?.category.name}</span> /{' '}
                        <span>{course?.subCategory}</span>
                      </p>
                    </div>
                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Slug:</h2>
                      <p>{course?.slug}</p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Ảnh đại diện:</h2>
                      <div className="w-3/4 py-4">
                        <figure className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-2xl bg-green-200">
                          <Image
                            alt="course-thumbnail"
                            fill
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            src={course?.thumbnail || ''}
                          />
                        </figure>
                      </div>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">ID người hướng dẫn:</h2>
                      <p>{course?.userId}</p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Mô tả ngắn:</h2>
                      <p>{course?.briefDescription}</p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Mô tả chi tiết:</h2>
                      <article
                        className={`prose-xl prose h-fit min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80 lg:prose-2xl`}
                        dangerouslySetInnerHTML={{
                          __html: course?.detailDescription || '',
                        }}
                      ></article>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Mục tiêu khoá học:</h2>
                      <ul className="list-inside list-disc">
                        {course &&
                          Array.isArray(course?.courseTargets) &&
                          course?.courseTargets.length > 0 &&
                          course?.courseTargets.map((target) => {
                            return <li key={target.id}>{target.content}</li>;
                          })}
                      </ul>
                    </div>

                    {course &&
                      Array.isArray(course?.courseRequirements) &&
                      course?.courseRequirements.length > 0 && (
                        <div className="flex w-full flex-col">
                          <h2 className="font-bold">Yêu cầu khoá học:</h2>
                          <ul className="list-inside list-disc">
                            {course?.courseRequirements.map((requirement) => {
                              return (
                                <li key={requirement.id}>
                                  {requirement.content}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Chế độ riêng tư:</h2>
                      <p>
                        {Object.keys(MAPPING_PUBLISH_MODE_LANGUAGE).find(
                          (key) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            MAPPING_PUBLISH_MODE_LANGUAGE[key] ===
                            course?.publishMode,
                        )}
                      </p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Giá khoá học:</h2>
                      <p>{course?.coursePrice}</p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Trạng thái khoá học:</h2>
                      <p>
                        {Object.keys(MAPPING_COURSE_STATE_LANGUAGE).find(
                          (key) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            MAPPING_COURSE_STATE_LANGUAGE[key] ===
                            course?.courseState,
                        )}
                      </p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Đối tượng khoá học:</h2>
                      <p>
                        {Object.keys(MAPPING_LEVEL_LANGUAGE).find(
                          (key) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            MAPPING_LEVEL_LANGUAGE[key] === course?.courseLevel,
                        )}
                      </p>
                    </div>

                    <div className="flex w-full flex-col">
                      <h2 className="font-bold">Danh sách chương:</h2>
                      <ul className="list-inside list-decimal space-y-4">
                        {course &&
                          Array.isArray(course?.chapters) &&
                          course.chapters.length > 0 &&
                          course.chapters.map((chapter) => {
                            return (
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              //@ts-ignore
                              <li key={chapter.id}>
                                {chapter.title}{' '}
                                <span>
                                  (Số lượng bài học: {chapter.lectures?.length}
                                  ):
                                </span>
                                <ul className="pl-6">
                                  {Array.isArray(chapter.lectures) &&
                                    chapter.lectures.length > 0 &&
                                    chapter.lectures.map((lecture) => {
                                      return (
                                        <li
                                          key={lecture.id}
                                          className="full-size flex flex-col space-y-2"
                                        >
                                          <h3>
                                            Tên bài {lecture.order}:{' '}
                                            {lecture.title}
                                          </h3>
                                          <h4>Tài nguyên:</h4>
                                          <ul className="list-inside list-decimal pl-6">
                                            {Array.isArray(lecture.resources) &&
                                              lecture.resources.length > 0 &&
                                              lecture.resources.map((rsc) => {
                                                return (
                                                  <li key={rsc.id}>
                                                    ({rsc.type}){' '}
                                                    <a
                                                      rel="noreferrer"
                                                      className="text-sky-500"
                                                      target={'_blank'}
                                                      href={rsc.url}
                                                    >
                                                      {rsc.name}
                                                    </a>
                                                  </li>
                                                );
                                              })}
                                          </ul>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
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
