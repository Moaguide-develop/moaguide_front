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
      <div className="text-gray400 body7 cursor-pointer max-w-max w-full mx-auto mt-10 hover:underline">
        <span className="max-w-max">로그아웃</span>
      </div>
      <div className="h-[140px]" />
    </div>
  );
};

export default Mypage;
