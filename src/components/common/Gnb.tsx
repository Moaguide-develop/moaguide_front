'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie } from '@/utils/cookies';
import { refreshAccessToken } from '@/service/auth';

const Gnb = () => {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const intervalId = useRef<NodeJS.Timeout | null>(null); // useRef로 intervalId 관리

  const checkAndRefreshToken = useCallback(async () => {
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh');
    console.log('Checking tokens:', { accessToken, refreshToken }); // 로그 추가

    if (!accessToken && refreshToken) {
      try {
        const newAccessToken = await refreshAccessToken();
        setIsLoggedIn(!!newAccessToken);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(!!accessToken);
    }
    setIsLoading(false);
  }, [setIsLoggedIn]);

  useEffect(() => {
    checkAndRefreshToken();

    intervalId.current = setInterval(checkAndRefreshToken, 20 * 1000); // 50초마다 갱신 시도

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [checkAndRefreshToken]);

  if (isLoading) return null;


  return (
    <div
      className={` sticky top-0 z-[99999] bg-white h-[59px] ${
        pathname.includes('/mypage') ||
        pathname.includes('/report/') ||
        pathname.includes('/payment')
          ? 'shadow-custom-light border-b border-gray100'
          : ''
      }`}>
      <div className="py-[16px] max-w-[1000px] mx-auto flex items-center justify-between sm:px-0 sm:py-3 w-[90%] lg:w-[100%]">
        <Link href={'/'} className="cursor-pointer">
          <img src="/images/logo.svg" alt="logo" className="w-[144px] h-5" />
        </Link>
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
      </div>
    </div>
  );
};

export default Gnb;