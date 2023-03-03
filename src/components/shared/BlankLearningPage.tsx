import React from 'react';
import { GiSchoolBag } from 'react-icons/gi';
import usePreviousRoute from '~/contexts/HistoryRouteContext';
import Link from 'next/link';
import { PATHS } from '~/constants';
import { useRouter } from 'next/router';

export default function BlankPage() {
  const router = useRouter();
  const prevRoute = usePreviousRoute();

  return (
    <div className="absolute-center min-h-screen flex-col space-y-4">
      <h1 className="text-center text-3xl font-bold md:text-4xl">
        Khoá học không tồn tại hoặc bạn chưa ghi danh!
      </h1>
      <GiSchoolBag className="h-32 w-32" />

      <p className="italic">Xách balo lên và ghi danh khoá học!</p>

      <div className="flex space-x-4">
        <button className="smooth-effect rounded-xl bg-yellow-300 p-3 text-black hover:bg-yellow-200">
          <Link
            href={`/${PATHS.COURSE}/${
              router.query.params && router.query.params?.length > 0
                ? router.query.params[0]
                : ''
            }`}
          >
            Ghi danh
          </Link>
        </button>
        <button className="smooth-effect rounded-xl border border-yellow-300 p-3 hover:border-yellow-200">
          <Link href={prevRoute?.url || '/'}>Trở về</Link>
        </button>
      </div>
    </div>
  );
}
