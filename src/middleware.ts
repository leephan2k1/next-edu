import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { PATHS } from '~/constants';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.includes(PATHS.TEACHING) ||
    req.nextUrl.pathname.includes(PATHS.USER_PROFILE) ||
    req.nextUrl.pathname.includes(PATHS.LEARNING)
  ) {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });

    //fix ref: https://nextjs.org/docs/messages/middleware-relative-urls
    const url = req.nextUrl.clone();



    if (!session) {
      url.pathname = `/${PATHS.LOGIN}`;
      return NextResponse.redirect(url);
    }

    // If user is authenticated, continue.
  }
}
