import { CheckIcon, LinkIcon } from '@heroicons/react/20/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BiCategoryAlt } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi';
import { GiArcheryTarget } from 'react-icons/gi';
import { GrUserExpert } from 'react-icons/gr';
import { MdDriveFileRenameOutline, MdOutlineDraw } from 'react-icons/md';
import Editor from '~/components/shared/Editor';
import { categories_detail } from '~/constants';
import useCourse from '~/contexts/CourseContext';
import { useIsFirstRender } from 'usehooks-ts';
import { LEVELS_LABEL, MAPPING_LEVEL_LANGUAGE } from '~/constants';

import type QuillComponent from 'react-quill';

export interface IFormInput {
  courseName: string;
  courseTargets: string[];
  courseRequirements: string[];
  courseLevel: string;
  briefDescCourse: string;
  meetingPlatform: string;
  category: string;
  category_details: string;
}

function CourseCreationInfo() {
  const courseCtx = useCourse();
  const isFirst = useIsFirstRender();

  const editorRef = useRef<QuillComponent | null>(null);

  const {
    getValues,
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { courseTargets: [' '], courseRequirements: [' '] },
  });

  const {
    fields: courseTargetsFields,
    append: courseTargetsAppend,
    remove: courseTargetsRemove,
  } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    name: 'courseTargets',
  });

  const {
    fields: courseRequirementsFields,
    append: courseRequirementsAppend,
    remove: courseRequirementsRemove,
  } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    name: 'courseRequirements',
  });

  // //update form value to context:
  useEffect(() => {
    const {
      courseName,
      category,
      category_details,
      briefDescCourse,
      meetingPlatform,
      courseTargets,
      courseRequirements,
      courseLevel,
    } = getValues();

    if (!courseName && !isFirst) {
      setError('courseName', {
        type: 'required',
        message: 'Tên khoá học bắt buộc phải có trước tiên!',
      });
    }

    if (courseName) {
      courseCtx?.updateCourse({
        name: courseName,
        category: { name: category, subCategory: category_details },
        briefDescription: briefDescCourse.trim(),
        detailDescription: editorRef.current?.value
          ? (editorRef.current.value as string)
          : '',
        meetingPlatform,
        courseTargets: courseTargets.map((elem) => elem.trim()),
        courseRequirements: courseRequirements.map((elem) => elem.trim()),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        courseLevel: MAPPING_LEVEL_LANGUAGE[courseLevel],
      });
    }
  }, [courseCtx?.dispatchUpdate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="mt-4 flex flex-col"
    >
      <h1 className="text-3xl">1. Thông tin cơ bản</h1>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <MdDriveFileRenameOutline className="h-8 w-8" />{' '}
            <span>Tên khoá học</span>
          </h2>
          <span className="text-xl italic">(Tối đa 60 ký tự)</span>
        </div>

        <span className="my-2 italic text-rose-400">
          {errors?.courseName?.message}
        </span>
        <input
          onFocus={() => {
            clearErrors('courseName');
          }}
          {...register('courseName', { maxLength: 60, required: true })}
          type="text"
          placeholder="Khoá học từ hero về zero..."
          className={`my-2 rounded-xl ${
            errors?.courseName ? 'border border-rose-500' : ''
          } p-4 focus:ring-1 focus:ring-gray-200 md:w-1/2`}
        />
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <h2 className="flex items-center space-x-3">
            <BiCategoryAlt className="h-8 w-8" /> <span>Danh mục khoá học</span>
          </h2>
        </div>

        <select
          {...register('category')}
          className="my-4 max-w-md rounded-xl p-4"
        >
          <option disabled defaultValue="Danh mục:">
            Danh mục:
          </option>
          {categories_detail.map((category) => {
            return (
              <option value={category.title} key={category.title}>
                {category.title}
              </option>
            );
          })}
        </select>

        {watch('category') && (
          <select
            {...register('category_details')}
            className="my-4 max-w-md rounded-xl p-4"
          >
            <option disabled defaultValue="Danh mục chi tiết">
              Danh mục chi tiết:
            </option>
            {categories_detail
              .find((e) => e.title === watch('category'))
              ?.fields.map((category_details) => {
                return (
                  <option value={category_details} key={category_details}>
                    {category_details}
                  </option>
                );
              })}
          </select>
        )}
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <MdOutlineDraw className="h-8 w-8" /> <span>Mô tả ngắn</span>
          </h2>
          <span className="text-xl italic">(Tối đa 500 ký tự)</span>
        </div>

        <input
          {...register('briefDescCourse', { maxLength: 500 })}
          type="text"
          placeholder="Khoá học cung cấp cho bạn..."
          className="my-2 rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-1/2"
        />
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <MdOutlineDraw className="h-8 w-8" /> <span>Mô tả chi tiết</span>
          </h2>
          <span className="text-xl italic">(Tối đa 5000 ký tự)</span>
        </div>

        <Editor
          styles="lg:max-w-[70%] px-0 my-2"
          getInstance={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <LinkIcon className="h-8 w-8" />{' '}
            <span>Liên kết nền tảng họp trực tuyến</span>
          </h2>
          <span className="text-xl italic">
            (Google Meet, Zoom, Microsoft Teams)
          </span>
        </div>

        <input
          {...register('meetingPlatform')}
          type="text"
          placeholder="meet.google.com/abc-degf-xyz"
          className="my-2 max-w-md rounded-xl p-4 focus:ring-1 focus:ring-gray-200"
        />
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <GiArcheryTarget className="h-8 w-8" />{' '}
            <span>Mục tiêu khoá học</span>
          </h2>
          <span className="text-xl italic">
            (Cần cung cấp ít nhất 4 mục tiêu)
          </span>
        </div>

        {courseTargetsFields.map((item, index) => {
          return (
            <input
              {...register(`courseTargets.${index}` as const)}
              key={item.id}
              type="text"
              className="my-2 rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-1/2"
            />
          );
        })}

        <div className="flex items-center justify-between md:w-1/2">
          <button
            onClick={() => courseTargetsAppend(' ', { shouldFocus: false })}
            className="smooth-effect my-4 flex w-fit items-center space-x-2 hover:text-primary"
          >
            <PlusIcon className="h-8 w-8" /> <span>Thêm mục tiêu</span>{' '}
          </button>

          <button
            onClick={() => courseTargetsRemove(1)}
            className="smooth-effect my-4 flex w-fit items-center space-x-2 hover:text-primary"
          >
            <FiTrash className="h-8 w-8" /> <span>Xoá</span>{' '}
          </button>
        </div>
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <CheckIcon className="h-8 w-8 dark:fill-white" />{' '}
            <span>Yêu cầu của khoá học</span>
          </h2>
          <span className="text-xl italic md:w-3/4">
            (Danh sách công cụ, thiết bị, kinh nghiệm,... yêu cầu người học cần
            có. Nếu không có, hãy bỏ trống để phủ rộng đối tượng người học!)
          </span>
        </div>

        {courseRequirementsFields.map((item, index) => {
          return (
            <input
              {...register(`courseRequirements.${index}` as const)}
              key={item.id}
              type="text"
              className="my-2 rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-1/2"
            />
          );
        })}

        <div className="flex items-center justify-between md:w-1/2">
          <button
            onClick={() =>
              courseRequirementsAppend(' ', { shouldFocus: false })
            }
            className="smooth-effect my-4 flex w-fit items-center space-x-2 hover:text-primary"
          >
            <PlusIcon className="h-8 w-8" /> <span>Thêm yêu cầu</span>{' '}
          </button>

          <button
            onClick={() => courseRequirementsRemove(1)}
            className="smooth-effect my-4 flex w-fit items-center space-x-2 hover:text-primary"
          >
            <FiTrash className="h-8 w-8" /> <span>Xoá</span>{' '}
          </button>
        </div>
      </div>

      <div className="my-4 flex w-full flex-col px-6">
        <div className="flex flex-col">
          <h2 className="flex items-center space-x-3">
            <GrUserExpert className="h-8 w-8" />{' '}
            <span>Khoá học dành cho ai?</span>
          </h2>
          <span className="text-xl italic">
            (Phạm vi đối tượng người học mà bạn muốn hướng đến!)
          </span>
        </div>

        <select
          {...register('courseLevel')}
          className="my-4 max-w-md rounded-xl p-4"
        >
          <option disabled defaultValue={'Đối tượng:'}>
            Đối tượng:
          </option>
          {LEVELS_LABEL.map((level) => {
            return (
              <option value={level} key={level}>
                {level}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
}

export default memo(CourseCreationInfo);
