import { AiFillTwitterCircle, AiOutlineGithub } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { inter } from '~/constants';
import Balancer from 'react-wrap-balancer';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-10 flex flex-col items-center rounded bg-[#efeae6] px-10 py-20 text-2xl text-gray-600 dark:bg-dark-background dark:text-white/50 md:text-3xl">
      <Logo />

      <small className="my-1 text-sm font-semibold">
        Powered by{' '}
        <a
          className="text-blue-400"
          target="_blank"
          rel="noreferrer"
          href="https://create.t3.gg/"
        >
          T3-Stack
        </a>
      </small>

      <div className="flex items-center space-x-6">
        <a
          href={'https://github.com/leephan2k1/next-edu'}
          target="_blank"
          rel="noreferrer"
          className="my-4"
        >
          <AiOutlineGithub className="h-9 w-9" />
        </a>

        <a
          href={'https://www.facebook.com/leephan2001'}
          target="_blank"
          rel="noreferrer"
          className="my-4"
        >
          <BsFacebook className="h-8 w-8" />
        </a>

        <a
          href={'https://twitter.com/trietly7'}
          target="_blank"
          rel="noreferrer"
          className="my-4"
        >
          <AiFillTwitterCircle className="h-9 w-9" />
        </a>
      </div>
      <h1
        className="mt-4 max-w-[60%] text-center text-xl font-bold text-gray-500 dark:text-white/60 md:max-w-[40%] md:text-3xl"
        style={{
          fontFamily: inter.style.fontFamily,
        }}
      >
        <Balancer>
          Next Edu là dự án mô phỏng lại cách học hướng đến tương lai
        </Balancer>
      </h1>

      <span className="my-4 text-base font-semibold">© NextEdu 2023</span>

      <h2 className="my-4 text-xl font-bold highlight highlight-yellow-300 highlight-variant-14 dark:text-white dark:highlight-yellow-600">
        Project Series
      </h2>

      <div className="flex items-center space-x-6">
        <a
          href="https://kyotomanga.live"
          className="text-lg font-bold"
          target="_blank"
          rel="noreferrer"
        >
          kyotomanga.live
        </a>

        <a
          href="https://realcost.shop"
          className="text-lg font-bold"
          target="_blank"
          rel="noreferrer"
        >
          realcost.shop
        </a>

        <a
          href="https://animanlab.online"
          className="text-lg font-bold"
          target="_blank"
          rel="noreferrer"
        >
          animanlab.online
        </a>
      </div>
    </footer>
  );
}
