'use client';
import MypageHeader from '@/components/mypage/MypageHeader';
import MypageMenu from '@/components/mypage/MypageMenu';
import React from 'react';

const Mypage = () => {
  return (
    <div className="max-w-[640px] w-full mx-auto mt-10">
      <header>
        <MypageHeader />
      </header>
      <nav>
        <MypageMenu />
      </nav>
      <div className="text-gray400 underline body7 cursor-pointer flex justify-center mt-10">
        로그아웃
      </div>
      <div className="h-[140px]" />
    </div>
  );
};

export default Mypage;
