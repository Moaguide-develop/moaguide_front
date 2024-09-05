'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Suspense } from 'react';

const Navbar = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get('category');
  console.log(pathname);
  const isHomeActive = pathname === '/' && (category === null || category === '');

  return (
    <div className="shadow-custom-light border-b border-gray100">
      <div className="max-w-[1000px] mx-auto flex items-center">
        <div
          onClick={() => {
            router.push('/');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
          ${isHomeActive ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
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
            router.push('/reportpage');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${pathname === '/reportpage' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          리포트
        </div>
      </div>
    </div>
  );
};

export default Navbar;
