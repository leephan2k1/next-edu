import { useState, useRef } from 'react';
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import Loading from '../buttons/Loading';
import toast from 'react-hot-toast';

interface ConfirmCoursePasswordProps {
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmCoursePassword({
  setIsUnlocked,
}: ConfirmCoursePasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: checkPassword, isLoading } =
    trpc.course.checkCoursePassword.useMutation({
      onSuccess(data) {
        if (data) {
          setIsUnlocked(true);
        } else {
          toast.error('Mật khẩu không đúng!');
        }
      },
    });

  const handleCheckPassword = () => {
    const courseSlug = router.query?.slug as string;
    if (!courseSlug) return;

    checkPassword({ password: inputRef.current?.value as string, courseSlug });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[10rem] flex h-[20rem] w-[85vw] flex-col justify-between md:w-[70vw]">
        <div className="w-full">
          <div className="flex items-center justify-center space-x-4">
            <LockClosedIcon className="h-10 w-10" />
            <h1 className="text-center md:text-4xl">
              Khoá học cần mật khẩu để truy cập
            </h1>
          </div>

          <div className="mt-10 flex items-center justify-center space-x-4">
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              className="w-3/4 rounded-xl p-3 md:w-1/2 lg:w-[30%]"
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-4"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-8 w-8" />
              ) : (
                <EyeIcon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        <div className="absolute-center w-full">
          <button
            disabled={isLoading}
            onClick={handleCheckPassword}
            className="absolute-center min-h-[4rem] w-fit min-w-[8.3rem] rounded-xl bg-yellow-200 py-3 px-4 text-gray-600"
          >
            {isLoading ? <Loading /> : 'Truy cập'}
          </button>
        </div>
      </div>
    </div>
  );
}
