'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie } from '@/utils/cookie';
import { refreshAccessToken } from '@/service/auth';

const Gnb = () => {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // access_token 갱신
  const checkAndRefreshToken = useCallback(async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      setIsLoggedIn(!!newAccessToken);
    } catch (error) {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      setIsLoggedIn(false);

      // 요청 실패 시 interval 정지
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
      setIsLoading(false);

      // 29분마다 토큰 갱신 시도
      intervalId.current = setInterval(checkAndRefreshToken, 29 * 60 * 1000);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [checkAndRefreshToken, setIsLoggedIn]);
  if (pathname.includes('detail') && isLoading) return null;

  return (
    <div
      className={`sticky top-0 z-[999] bg-white h-[59px] ${
        pathname.includes('/mypage') ||
        pathname.includes('/report/') ||
        pathname.includes('/payment')
          ? 'shadow-custom-light border-b border-gray100'
          : ''
      }`}>
      <div className="py-[16px] max-w-[1000px] h-[60px]  mx-auto flex items-center justify-between sm:px-0 sm:py-3 w-[90%] lg:w-[100%]">
        <Link href={'/'} className="cursor-pointer h-6">
          <img src="/images/logo.svg" alt="logo" className="w-[144px] h-5" />
        </Link>
        {!isLoading && (
          <div className="flex items-center gap-6">
            <div onClick={() => router.push('/search')} className="cursor-pointer">
              <img src="/images/gnb/search.svg" alt="search_icon" className="w-6 h-6" />
            </div>
            <div
              onClick={() => {
                if (isLoggedIn) {
                  router.push('/alarm');
                } else {
                  router.push('/sign');
                }
              }}
              className="cursor-pointer">
              <img src="/images/gnb/alert.svg" alt="alert" className="w-6 h-6" />
            </div>

            <div className="hidden items-center min-h-[35px] sm:flex">
              {isLoggedIn ? (
                <Link href={'/mypage'}>
                  <img src="/images/gnb/mypage.svg" alt="mypage" className="w-6 h-6" />
                </Link>
              ) : (
                <Link
                  href={'/sign'}
                  className="flex items-center justify-center px-3 py-2 text-normal text-body6 border border-normal rounded-[12px]">
                  로그인 / 회원가입
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gnb;
