import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  // const getCookie = (key: string) => {
  //   return cookies().get(key)?.value;
  // };

  // const token = getCookie('access_token');
  // const pathname = request.nextUrl.pathname;

  // const dynamicRouteRegex = /^\/product\/detail\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/;
  // if (!token && dynamicRouteRegex.test(pathname)) {
  //   console.log('Dynamic route detected:', pathname);
  //   return NextResponse.redirect(new URL('/sign', request.url));
  // }
  // if (
  //   pathname.startsWith('/api') ||
  //   pathname.includes('.') ||
  //   pathname.startsWith('/_next/static/') ||
  //   pathname.startsWith('/favicon') ||
  //   pathname === '/manifest.json' ||
  //   pathname.startsWith('/icons/')
  // ) {
  //   return NextResponse.next();
  // }
  // console.log('middleware full URL:', request.nextUrl.href);
  // if (
  //   !token &&
  //   !['/sign', '/signin', '/signup', '/find', '/search', '/'].includes(pathname)
  // ) {
  //   return NextResponse.redirect(new URL('/sign', request.url));
  // }

  return NextResponse.next();
}
