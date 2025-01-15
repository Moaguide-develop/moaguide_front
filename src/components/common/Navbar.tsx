'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="hidden  bg-white shadow-custom-light border-b desk:h-[60px] md:h-full border-gray100 sm:block desk:w-full  lg:w-[100%] sticky top-[58px] z-[99998]">
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
          className={` desk:whitespace-nowrap px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/newissue' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          최신이슈
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className={`  desk:whitespace-nowrap px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/product' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          조각투자 상품
        </div>
        <div
          onClick={() => {
            router.push('/practicepage');
          }}
          className={` desk:whitespace-nowrap px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/practicepage' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          학습하기
        </div>
      </div>
    </div>
  );
};

export default Navbar;
