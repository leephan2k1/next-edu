import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState, memo } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { createCourseSteps } from '~/atoms/createCourseSteps';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h3>Mật khẩu khoá học</h3>
      <div className="my-2 flex items-center">
        <input
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

function CoursePriceInput() {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="number"
        placeholder="10 000"
        className="rounded-xl p-4 focus:ring-1 focus:ring-gray-200 md:w-[40%]"
      />
      <span>VNĐ</span>
    </div>
  );
}

function CoursePublishing() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPaidCourse, setIsPaidCourse] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const setStep = useSetAtom(createCourseSteps);

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setStep((prevStep) => ++prevStep);
    } else {
      setStep((prevStep) => (prevStep > 1 ? --prevStep : prevStep));
    }
  }, [entry]);

  return (
    <div className="mt-6 flex flex-col space-y-6">
      <h1 ref={ref} className="text-3xl">
        3. Phát hành khoá học
      </h1>

      <h3>Chế độ riêng tư</h3>

      <select
        onChange={(e) => {
          setIsPrivate(e.currentTarget.value.toLowerCase() === 'riêng tư');
        }}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Công khai</option>
        <option>Riêng tư</option>
      </select>

      {isPrivate && <PasswordInput />}

      <h3>Học phí</h3>
      <select
        onChange={(e) => {
          setIsPaidCourse(e.currentTarget.value.toLowerCase() === 'có phí');
        }}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Miễn phí</option>
        <option>Có phí</option>
      </select>

      {isPaidCourse && <CoursePriceInput />}

      <h3>Nội dung khoá học ở dạng</h3>
      <select
        onChange={(e) => {
          setIsPaidCourse(e.currentTarget.value.toLowerCase() === 'có phí');
        }}
        className="my-4 max-w-md rounded-xl p-4"
      >
        <option defaultChecked>Hoàn thiện</option>
        <option>Tích luỹ</option>
      </select>
    </div>
  );
}

export default memo(CoursePublishing);
