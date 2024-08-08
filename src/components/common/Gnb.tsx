'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Gnb = () => {
  const pathname = usePathname();

  return (
    <div
      className={
        pathname.includes('/mypage') ? 'shadow-custom-light border-b border-gray100' : ''
      }>
      <div className="max-w-[1000px] mx-auto flex items-center justify-between py-3 desk:min-w-[400px]">
        <Link href={'/'} className="cursor-pointer">
          <img src="/images/logo.svg" alt="logo" className="w-[144px] h-5" />
        </Link>
        <div className="flex items-center gap-6">
          <div className="cursor-pointer">
            <img src="/images/gnb/search.svg" alt="search_icon" className="w-6 h-6" />
          </div>
          <div className="cursor-pointer">
            <img src="/images/gnb/alert.svg" alt="alert" className="w-6 h-6" />
          </div>
          {/* 로그인이 안되어 있을때 */}
          <Link
            href={'/sign'}
            className="flex items-center justify-center px-3 py-2 text-normal text-body6 border-radius: 12px border border-normal rounded-[12px] ">
            로그인 / 회원가입
          </Link>
          {/* 로그인 했을 때 */}
          {/* <Link href={'/mypage'}>
        <img src="/images/gnb/mypage.svg" alt="mypage" className='w-6 h-6'/>
        </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Gnb;
