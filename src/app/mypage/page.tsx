'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import MypageHeader from '@/components/mypage/MypageHeader';
import MypageMenu from '@/components/mypage/MypageMenu';
import { logout, refreshAccessToken } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie, removeCookie } from '@/utils/cookie';
import { axiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const Mypage = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const { data } = await axiosInstance.get('/user/bookmark');
    return data;
  };

  const { data: bookmarks } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks
  });

  const handleLogout = useCallback(async () => {
    await logout();
    setIsLoggedIn(false);
    removeCookie('access_token');
    removeCookie('refresh');
    router.push('/sign');
  }, [router, setIsLoggedIn]);

  const checkAndRefreshToken = useCallback(async () => {
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh');
    
    if (!accessToken && refreshToken) {
      try {
        await refreshAccessToken();
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        handleLogout();
      }
    } else if (!accessToken) {
      handleLogout();
    } else {
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, [setIsLoggedIn, handleLogout]);

  useEffect(() => {
    checkAndRefreshToken();
  }, [checkAndRefreshToken]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] sm:mb-0 w-[90%] mx-auto sm:max-w-[640px]">
      <header>
        <MypageHeader bookmarks={bookmarks} />
      </header>
      <nav>
        <MypageMenu />
      </nav>
      <div
        className="text-gray400 body7 cursor-pointer max-w-max w-full mx-auto mt-10 pb-4 hover:underline"
        onClick={handleLogout}>
        <span className="max-w-max mb-[40px] sm:mb-0">로그아웃</span>
      </div>
    </div>
  );
};

export default Mypage;
