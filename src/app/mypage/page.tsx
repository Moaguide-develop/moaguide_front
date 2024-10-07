'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MypageHeader from '@/components/mypage/MypageHeader';
import MypageMenu from '@/components/mypage/MypageMenu';
import { logout } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie, removeCookie } from '@/utils/cookie';

const Mypage = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getCookie('access_token');
      if (!accessToken || accessToken === 'undefined') {
        router.push('/sign');
      } else {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    removeCookie('access_token');
    router.push('/sign');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-[calc(100dvh-160px)] flex flex-col sm:min-h-[calc(100vh-160px)] sm:mb-0 mt-5 w-[90%] mx-auto sm:max-w-[640px] sm:mt-10">
      <header>
        <MypageHeader />
      </header>
      <nav>
        <MypageMenu />
      </nav>
      <div 
        className="text-gray400 body7 cursor-pointer max-w-max w-full mx-auto mt-10 hover:underline"
        onClick={handleLogout}
      >
        <span className="max-w-max">로그아웃</span>
      </div>
    </div>
  );
};

export default Mypage;
