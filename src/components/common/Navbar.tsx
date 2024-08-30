'use client';
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Navbar = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); 
  const category = params.get('category');
  
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
            router.push('/?category=newissue');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${category === 'newissue' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          최신이슈
        </div>
        <div
          onClick={() => {
            router.push('/?category=product');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${category === 'product' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          조각투자 상품
        </div>
        <div
          onClick={() => {
            router.push('/?category=report');
          }}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${category === 'report' ? 'text-black border-b-[2px] border-black' : 'text-gray300'}
        `}>
          리포트
        </div>
      </div>
    </div>
  );
};

export default Navbar;
