import {
  authMiddleware,
  redirectToSignIn,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/app/']);

import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth: (auth, req) => {
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3123)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // special case for Vercel preview deployment URLs
    if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    console.log(auth);
    // rewrites for app pages
    if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!auth.userId && !auth.isPublicRoute) {
        const prefix =
          process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
        return redirectToSignIn({
          returnBackUrl: `${prefix}${hostname}/sign-in`,
        });
      }

      return NextResponse.rewrite(
        new URL(`/app${path === '/' ? '' : path}`, req.url),
      );
    }

    // special case for `vercel.pub` domain
    //   if (hostname === 'vercel.pub') {
    //     return NextResponse.redirect(
    //       'https://vercel.com/blog/platforms-starter-kit',
    //     );
    //   }

    // rewrite root application to `/home` folder
    if (
      hostname === 'localhost:3000' ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      return NextResponse.rewrite(
        new URL(`/home${path === '/' ? '' : path}`, req.url),
      );
    }
    // console.log("here");

    // rewrite everything else to `/[domain]/[slug] dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },
});
