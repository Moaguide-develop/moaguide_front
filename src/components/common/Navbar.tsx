'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="hidden shadow-custom-light border-b border-gray100 sm:block w-[90%] lg:w-[100%] mx-auto">
      <div className="max-w-[1000px] mx-auto flex items-center">
        <div
          onClick={() => {
            router.push('/');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
          ${pathname === '/' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          홈
        </div>
        <div
          onClick={() => {
            router.push('/newissue');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/newissue' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          최신이슈
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/product' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          조각투자 상품
        </div>
        <div
          onClick={() => {
            router.push('/practicepage');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/practicepage' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          학습하기
        </div>
      </div>
    </div>
  );
};

export default Navbar;
