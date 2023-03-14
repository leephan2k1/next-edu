import Image from 'next/image';
import { inter } from '~/constants';
import { PATHS } from '~/constants';
import Link from 'next/link';

export default function TeacherBanner() {
  return (
    <div className="my-10 flex h-fit min-h-[40rem] w-full flex-col items-center md:flex-row">
      <figure className="relative my-auto h-3/4 min-h-[264px] w-full max-w-[390px] md:h-full md:w-[60%] md:max-w-none lg:h-[300px] lg:w-[55%]">
        <Image
          className="absolute inset-0 h-auto bg-cover bg-center bg-no-repeat"
          alt="teacher-banner"
          fill
          src="https://i.ibb.co/Lp7CvtV/teacher-ii-removebg-preview-transformed.png"
        />
      </figure>

      <div className="space-y- flex h-full flex-1 flex-col items-center p-6 text-gray-600 dark:text-white">
        <div className="flex w-full flex-col items-center lg:w-3/4">
          <h1
            className="my-2 text-center font-bold lg:text-4xl"
            style={{ fontFamily: inter.style.fontFamily }}
          >
            Trở thành người hướng dẫn
          </h1>

          <p className="my-6 w-full px-6">
            Trở thành người đưa đò là nhiệm vụ cao quý nhất. Hãy chia sẽ bất kỳ
            kiến thức và kỹ năng của bạn. Chúng tôi cung cấp những công cụ giúp
            bạn đến gần hơn với học viên!
          </p>
        </div>

        <button className="btn-primary btn-lg btn">
          <Link href={`/${PATHS.TEACHING}/${PATHS.COURSE}`}>
            Bắt đầu dạy hôm nay
          </Link>
        </button>
      </div>
    </div>
  );
}
