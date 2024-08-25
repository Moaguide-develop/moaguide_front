'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import MypageHeader from '@/components/mypage/MypageHeader';
import MypageMenu from '@/components/mypage/MypageMenu';
import { logout } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';

const Mypage = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore(); 

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push('/sign');
  };

  return (
    <div className="max-w-[640px] w-full mx-auto mt-10">
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
      <div className="h-[140px]" />
    </div>
  );
};

export default Mypage;
