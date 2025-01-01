'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie } from '@/utils/cookie';
import { refreshAccessToken } from '@/service/axiosInstance';

const RefreshTokenWrapper = () => {
  // const { setIsLoggedIn } = useAuthStore();
  // const [isLoading, setIsLoading] = useState(true);

  // const intervalId = useRef<NodeJS.Timeout | null>(null);

  // const handleTokenRefresh = useCallback(async () => {
  //   try {
  //     const newAccessToken = await refreshAccessToken();
  //     setIsLoggedIn(!!newAccessToken);
  //   } catch (error) {
  //     console.error('리프레시 토큰 갱신 실패:', error);
  //     alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
  //     setIsLoggedIn(false);
  //     if (intervalId.current) clearInterval(intervalId.current);
  //   }
  // }, [setIsLoggedIn]);

  // useEffect(() => {
  //   const accessToken = getCookie('access_token');
  //   if (accessToken) {
  //     setIsLoggedIn(true);
  //     setIsLoading(false);
  //     intervalId.current = setInterval(handleTokenRefresh, 29 * 60 * 1000);
  //   } else {
  //     setIsLoggedIn(false);
  //     setIsLoading(false);
  //   }

  //   return () => {
  //     if (intervalId.current) clearInterval(intervalId.current);
  //   };
  // }, [handleTokenRefresh, setIsLoggedIn]);

  return null;
};

export default RefreshTokenWrapper;
