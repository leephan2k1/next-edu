import Link from 'next/link';
import { preahvihear } from '~/constants';

interface LogoProps {
  customStyles?: string;
}

export default function Logo({ customStyles }: LogoProps) {
  return (
    <Link
      href={'/'}
      className={`${customStyles} text-3xl font-bold text-yellow-400 dark:text-primary md:text-5xl`}
      style={{
        fontFamily: preahvihear.style.fontFamily,
      }}
    >
      Next Edu
    </Link>
  );
}
