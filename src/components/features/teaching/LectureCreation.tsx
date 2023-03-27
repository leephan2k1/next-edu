import { useSetAtom } from 'jotai';
import { memo, useEffect, useRef, useState, useMemo } from 'react';
import { UploadButton } from 'react-uploader';
import { lecturesContents } from '~/atoms/lecturesContents';
import Editor from '~/components/shared/Editor';
import { uploader } from '~/constants';
import { checkFileType } from '~/utils/stringHandler';
import {
  DocumentTextIcon,
  FilmIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

import type { Dispatch, SetStateAction } from 'react';
import type QuillComponent from 'react-quill';
import type { LectureType } from '~/types';

interface LectureCreationProps {
  lectures?: LectureType[];
  chapterIndex: number;
  lectureIndex: number;
  removeLecture: Dispatch<SetStateAction<number[]>>;
}

function LectureCreation({
  lectures,
  chapterIndex,
  lectureIndex,
  removeLecture,
}: LectureCreationProps) {
  const lectureByDb = useMemo(() => {
    return (
      lectures && lectures.find((lecture) => lecture.order === lectureIndex)
    );
  }, [lectures]);

  // console.log('lectureByDb:; ', lectureByDb);

  const [lectureTitle, setLectureTitle] = useState(() => {
    if (lectureByDb) return lectureByDb.title;

    return `Tên bài học ${lectureIndex}`;
  });

  const [description, setDescription] = useState(() => {
    if (lectureByDb) return lectureByDb.description || '';

    return '';
  });

  const [isPreview, setIsPreview] = useState(() => {
    if (lectureByDb) return lectureByDb.isPreview;

    return false;
  });
  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [shouldContents, setShouldContents] = useState(false);
  const [shouldVideoUpload, setShouldVideoUpload] = useState(true);

  const [fileUrls, setFilesUrl] = useState<
    { fileId: string; fileName: string; fileURL: string }[]
  >(() => {
    // ?
    if (lectureByDb)
      return lectureByDb.resources.map((rsc) => ({
        fileId: rsc.id,
        fileName: rsc.name,
        fileURL: rsc.url,
      }));

    return [];
  });

  const editorRef = useRef<QuillComponent | null>(null);

  const setLecturesContents = useSetAtom(lecturesContents);

  //hook update lecture values
  useEffect(() => {
    const payload = {
      title: lectureTitle,
      description: description,
      isPreview,
      order: lectureIndex,
      chapterOrder: chapterIndex,
      resources: fileUrls.map((elem) => ({
        name: elem.fileName,
        url: elem.fileURL,
        type: checkFileType(elem.fileName) || '',
        videoDuration: null,
      })),
    };

    // console.log('payload::::; ', payload);

    setLecturesContents((prevState) => {
      //create if non-exist:
      if (
        !prevState.find(
          (lecture) =>
            lecture.order === lectureIndex &&
            lecture.chapterOrder === chapterIndex,
        )
      ) {
        return [...prevState, payload];
      }
      //update if exist:
      else {
        return prevState.map((lecture) => {
          if (
            lecture.order === lectureIndex &&
            lecture.chapterOrder === chapterIndex
          ) {
            return payload;
          }

          return lecture;
        });
      }
    });
  }, [
    description,
    lectureTitle,
    isPreview,
    fileUrls,
    editorRef.current?.value,
    lectureIndex,
    chapterIndex,
  ]);

  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-200 p-4 dark:bg-black">
      <div className="flex justify-between">
        <h2>
          Bài {lectureIndex}: {lectureTitle}
        </h2>

        <div className="flex space-x-4">
          <button
            onClick={() => setShouldContents((prevState) => !prevState)}
            className="smooth-effect flex items-center justify-center rounded-xl  border border-gray-600 p-2 text-xl hover:border-green-500 hover:text-green-500"
          >
            <PlusIcon className="h-8 w-8" />
            <span>Tài nguyên</span>
          </button>
          <button
            onClick={() => setShouldShowInput((prevState) => !prevState)}
            className="smooth-effect hover:text-yellow-400"
          >
            <PencilIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() => {
              setLecturesContents((prevState) => {
                prevState.splice(
                  prevState.findIndex(
                    (lecture) =>
                      lecture.chapterOrder === chapterIndex &&
                      lecture.order === lectureIndex,
                  ),
                  1,
                );

                return prevState;
              });
              setTimeout(() => {
                removeLecture((prev) => {
                  return prev.filter((idx) => idx !== lectureIndex);
                });
              }, 100);
            }}
            className="smooth-effect hover:text-rose-500"
          >
            <TrashIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      {shouldShowInput && (
        <>
          <input
            onChange={(event) => {
              setLectureTitle(event.currentTarget.value);
            }}
            placeholder="Tên bài học"
            type="text"
            className="my-4 rounded border border-gray-600 p-3 dark:border-white/70"
            value={lectureTitle}
          />
          <h3 className="italic">Mô tả khoá học</h3>
          <Editor
            styles="px-0"
            onEditorChange={(value) => {
              setDescription(value);
            }}
            contents={description}
            getInstance={(editor) => {
              editorRef.current = editor;
            }}
          />
          <label className="mt-6 flex items-center space-x-4">
            <h3 className="italic">Bài học được xem trước (Preview)</h3>
            <input
              onChange={(e) => {
                setIsPreview(e.currentTarget.checked);
              }}
              type="checkbox"
              className="checkbox-success checkbox checkbox-lg md:checkbox-md"
            />
          </label>
        </>
      )}

      {shouldContents && (
        <div className="mx-auto my-4 flex space-x-4">
          {shouldVideoUpload && (
            <UploadButton
              uploader={uploader}
              options={{ multi: false, mimeTypes: ['video/mp4'] }}
              onComplete={(files) => {
                setFilesUrl((urls) =>
                  urls.concat(
                    files.map((file) => {
                      return {
                        fileId: String(file.originalFile.lastModified),
                        fileName: file.originalFile.originalFileName as string,
                        fileURL: file.fileUrl,
                      };
                    }),
                  ),
                );

                if (files.length > 0) {
                  setShouldVideoUpload(false);
                }
              }}
            >
              {({ onClick }) => (
                <button
                  className="smooth-effect absolute-center space-x-3 rounded-xl border border-dashed border-gray-500 p-2 "
                  onClick={onClick}
                >
                  <FilmIcon className="h-8 w-8" />
                  <span>Video</span>
                </button>
              )}
            </UploadButton>
          )}

          <UploadButton
            uploader={uploader}
            options={{
              multi: true,
              mimeTypes: [
                'application/pdf',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ],
            }}
            onComplete={(files) => {
              setFilesUrl((urls) =>
                urls.concat(
                  files.map((file) => {
                    return {
                      fileId: String(file.originalFile.lastModified),
                      fileName: file.originalFile.originalFileName as string,
                      fileURL: file.fileUrl,
                    };
                  }),
                ),
              );
            }}
          >
            {({ onClick }) => (
              <button
                className="smooth-effect absolute-center space-x-3 rounded-xl border border-dashed border-gray-500 p-2 "
                onClick={onClick}
              >
                <DocumentTextIcon className="h-8 w-8" />
                <span>Tài liệu</span>
              </button>
            )}
          </UploadButton>
        </div>
      )}

      <ul className="mx-auto my-4 flex w-full flex-col space-y-4">
        {fileUrls.length > 0 &&
          fileUrls.map((fileInfo) => {
            return (
              <li
                key={fileInfo.fileId}
                className="flex w-full items-center justify-between"
              >
                <div className="flex h-fit w-fit items-center space-x-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span className="max-w-[90%] line-clamp-1">
                    {fileInfo.fileName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFilesUrl((prevState) => {
                      return prevState.filter(
                        (file) => file.fileId !== fileInfo.fileId,
                      );
                    });

                    if (checkFileType(fileInfo.fileName) === 'video') {
                      setShouldVideoUpload(true);
                    }
                  }}
                  className="absolute-center smooth-effect rounded-full border border-gray-600 p-1 hover:bg-rose-500 hover:text-white dark:border-white"
                >
                  <XMarkIcon className="h-6 w-6" />{' '}
                </button>
              </li>
            );
          })}
      </ul>

      <div className=""></div>
    </div>
  );
}

export default memo(LectureCreation);
