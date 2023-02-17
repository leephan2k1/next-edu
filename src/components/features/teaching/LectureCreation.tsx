import { memo, useEffect, useState, useRef } from 'react';
import { UploadButton } from 'react-uploader';
import Editor from '~/components/shared/Editor';
import { uploader } from '~/constants';
import useCourse from '~/contexts/CourseContext';
import { useIsFirstRender } from 'usehooks-ts';
import {
  DocumentTextIcon,
  FilmIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import type { Dispatch, SetStateAction } from 'react';
import type QuillComponent from 'react-quill';

interface LectureCreationProps {
  chapterUpdated?: boolean;
  chapterIndex: number;
  lectureIndex: number;
  removeLecture: Dispatch<SetStateAction<number[]>>;
}

function LectureCreation({
  chapterUpdated,
  chapterIndex,
  lectureIndex,
  removeLecture,
}: LectureCreationProps) {
  const [lectureTitle, setLectureTitle] = useState(
    `Tên bài học ${lectureIndex}`,
  );
  const [isPreview, setIsPreview] = useState(false);
  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [shouldContents, setShouldContents] = useState(false);
  const [shouldVideoUpload, setShouldVideoUpload] = useState(true);
  const [fileUrls, setFilesUrl] = useState<
    { fileId: string; fileName: string; fileURL: string }[]
  >([]);

  const editorRef = useRef<QuillComponent | null>(null);

  const isFirstRender = useIsFirstRender();
  const courseCtx = useCourse();

  //hook update lecture values
  useEffect(() => {
    const payload = {
      title: lectureTitle,
      description: editorRef.current?.value
        ? (editorRef.current?.value as string)
        : '',
      isPreview,
      order: lectureIndex,
      resources: fileUrls.map((elem) => ({
        name: elem.fileName,
        url: elem.fileURL,
      })),
    };

    // console.log('payload:: ', payload);

    // wait the chapter update if chapter & lecture update same time
    if (!isFirstRender && chapterUpdated) {
      const chapter = courseCtx?.course?.chapters.find(
        (elem) => elem.order === chapterIndex,
      );

      if (chapter) {
        if (chapter.lectures && Array.isArray(chapter.lectures)) {
          // check lecture exist in chapter
          if (chapter.lectures.find((elem) => elem.order === lectureIndex)) {
            //re assign if resources array updated:
            Object.assign(chapter, {
              lectures: chapter.lectures.map((elem) => {
                if (elem.order === lectureIndex) {
                  return payload;
                }

                return elem;
              }),
            });
            return;
          }

          chapter.lectures.push(payload);
        } else {
          Object.assign(chapter, { lectures: [payload] });
        }

        courseCtx?.updateCourse({
          chapters: courseCtx.course?.chapters.map((chapterElem) => {
            if (chapter.order === chapterElem.order) {
              return chapter;
            }

            return chapterElem;
          }),
        });
      }
    }
  }, [courseCtx?.dispatchUpdate, chapterUpdated]);

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
            onClick={() =>
              removeLecture((prev) => {
                return prev.filter((idx) => idx !== lectureIndex);
              })
            }
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

                if (fileUrls.find((elem) => elem.fileURL.includes('.mp4'))) {
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
                'mime/application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
                className="flex w-full items-center space-x-4"
              >
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                <span className="max-w-[90%] line-clamp-1">
                  {fileInfo.fileName}
                </span>
              </li>
            );
          })}
      </ul>

      <div className=""></div>
    </div>
  );
}

export default memo(LectureCreation);
