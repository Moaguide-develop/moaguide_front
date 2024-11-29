import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const getCookie = (key: string) => {
    return cookies().get(key)?.value;
  };
  const token = getCookie('access_token');
  const pathname = request.nextUrl.pathname;
  // API 라우트나 정적 파일, 특정 정적 자원에 대한 요청을 건너뛰고, 페이지 요청에만 미들웨어를 적용합니다.
  if (
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/manifest.json' ||
    pathname === '/firebase-messaging-sw.js' ||
    pathname.startsWith('/icons/')
  ) {
    return NextResponse.next();
  }
  console.log('middleware', pathname);

  if (
    !token &&
    pathname !== '/sign' &&
    pathname !== '/signin' &&
    pathname !== '/signup' &&
    pathname !== '/find' &&
    pathname !== '/search' &&
    pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/sign', request.url));
  }

  return NextResponse.next();
}
