import { useSetAtom } from 'jotai';
import { memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntersectionObserver, useIsFirstRender } from 'usehooks-ts';
import { createCourseSteps } from '~/atoms/createCourseSteps';
import {
  MAPPING_COURSE_STATE_LANGUAGE,
  MAPPING_PUBLISH_MODE_LANGUAGE,
} from '~/constants';
import useCourse from '~/contexts/CourseContext';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import type { UseFormRegister } from 'react-hook-form';
interface IFormInput {
  publishMode: string;
  courseState: string;
  password: string;
  coursePriceSelect: string;
  coursePrice: number;
}

function PasswordInput({
  register,
}: {
  register: UseFormRegister<IFormInput>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h3>Mật khẩu khoá học</h3>
      <div className="my-2 flex items-center">
        <input
          autoComplete="new-password"
          {...register('password')}
          className="rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-1/2"
          type={showPassword ? 'text' : 'password'}
        />

        <button
          onClick={() => setShowPassword((prevState) => !prevState)}
          className="p-4"
        >
          {!showPassword ? (
            <EyeIcon className="h-8 w-8" />
          ) : (
            <EyeSlashIcon className="h-8 w-8" />
          )}
        </button>
      </div>
    </>
  );
}

function CoursePublishing() {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const setStep = useSetAtom(createCourseSteps);

  const courseCtx = useCourse();

  const isFirst = useIsFirstRender();

  const { getValues, register, watch } = useForm<IFormInput>({
    defaultValues: { coursePrice: 0 },
  });

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setStep((prevStep) => ++prevStep);
    } else {
      setStep((prevStep) => (prevStep > 1 ? --prevStep : prevStep));
    }
  }, [entry]);

  useEffect(() => {
    const {
      publishMode,
      courseState,
      coursePriceSelect,
      coursePrice,
      password,
    } = getValues();

    if (!isFirst) {
      courseCtx?.updateCourse({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        publishMode: MAPPING_PUBLISH_MODE_LANGUAGE[publishMode],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        courseState: MAPPING_COURSE_STATE_LANGUAGE[courseState],
        coursePrice: coursePriceSelect === 'Miễn phí' ? 0 : coursePrice,
        password: publishMode === 'Công khai' ? null : password,
      });
    }
  }, [courseCtx?.dispatchUpdate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="mt-6 flex flex-col space-y-6"
    >
      <h1 ref={ref} className="text-3xl">
        3. Phát hành khoá học
      </h1>

      <h3>Chế độ riêng tư</h3>

      <select
        {...register('publishMode')}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Công khai</option>
        <option>Riêng tư</option>
      </select>

      {watch('publishMode')?.toLowerCase() === 'riêng tư' && (
        <PasswordInput register={register} />
      )}

      <h3>Học phí</h3>
      <select
        {...register('coursePriceSelect')}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Miễn phí</option>
        <option>Có phí</option>
      </select>

      {watch('coursePriceSelect')?.toLocaleLowerCase() === 'có phí' && (
        <div className="flex items-center space-x-4">
          <input
            {...register('coursePrice')}
            type="number"
            placeholder="10 000"
            className="rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-[40%]"
          />
          <span>VNĐ</span>
        </div>
      )}

      <h3>Nội dung khoá học ở dạng</h3>
      <select
        {...register('courseState')}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Hoàn thiện</option>
        <option>Tích luỹ</option>
      </select>
    </form>
  );
}

export default memo(CoursePublishing);
