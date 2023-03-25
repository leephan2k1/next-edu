import NextHead from 'next/head';
// import { WEBSITE_URL } from '~/constants';
import { useRouter } from 'next/router';

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function Head({
  title = 'Next Education',
  description = 'Next Edu là dự án mô phỏng lại cách học hướng đến tương lai',
  image = 'https://i.ibb.co/n3TsZDp/next-edu-thumbnail.png',
}: HeadProps) {
  const { asPath } = useRouter();

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="manifest" href="/manifest.json" />

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={asPath} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={asPath} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Next Edu" />
      <meta name="apple-mobile-web-app-title" content="Next Edu" />
      <meta name="theme-color" content="#fce36c" />
      <meta name="msapplication-navbutton-color" content="#fce36c" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
}
