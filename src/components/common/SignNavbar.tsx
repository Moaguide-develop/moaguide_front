'use client';

import { useNavStore } from '@/store/nav.store';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignNavbar = () => {
  const router = useRouter();
  const { setCurrentNav } = useNavStore();

  const handleClick = (nav: string) => {
    setCurrentNav(nav); 
    router.push('/');
  };

  return (
    <div className="shadow-custom-light border-b border-gray100">
      <div className="max-w-[1000px] mx-auto flex items-center">
        <div
          onClick={() => handleClick('home')}
          className="px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4 text-gray300"
        >
          홈
        </div>
        <div
          onClick={() => handleClick('new_issue')}
          className="px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4 text-gray300"
        >
          최신이슈
        </div>
        <div
          onClick={() => handleClick('item')}
          className="px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4 text-gray300"
        >
          조각투자 상품
        </div>
        <div
          onClick={() => handleClick('report')}
          className="px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4 text-gray300"
        >
          리포트
        </div>
      </div>
    </div>
  );
};

export default SignNavbar;
