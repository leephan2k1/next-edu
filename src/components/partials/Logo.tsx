import Link from 'next/link';
import { preahvihear } from '~/constants';
import Image from 'next/image';

interface LogoProps {
  customStyles?: string;
}

export default function Logo({ customStyles }: LogoProps) {
  return (
    <div
      className={`${customStyles} relative min-h-[2.6rem] min-w-[8rem]  md:min-w-[10rem]`}
    >
      <Link
        href={'/'}
        className={``}
        style={{
          fontFamily: preahvihear.style.fontFamily,
        }}
      >
        <span className="relative-center absolute z-30 whitespace-nowrap text-3xl font-bold text-gray-700 dark:text-primary md:text-4xl">
          Next Edu
        </span>
        <figure className="absolute top-1/2 left-0 z-10 h-16 w-16 -translate-y-1/2">
          <Image
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            fill
            priority
            src={'/icons/apple-touch-icon.png'}
            alt="next-edu-logo"
          />
        </figure>
      </Link>
    </div>
  );
}
