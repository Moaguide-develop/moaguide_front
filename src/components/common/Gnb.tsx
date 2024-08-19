'use client';
import Link from 'next/link';
import React from 'react';
import { useAuthStore } from '@/store/userAuth.store';

const Gnb = () => {
  const { isLoggedIn } = useAuthStore(); 

  return (
    <div className='max-w-[1000px] mx-auto flex justify-between py-2 desk:min-w-[400px]'>
      <Link href={'/'} className='cursor-pointer'>
        <img src="/images/logo.svg" alt="logo" className='w-[144px] h-5'/>
      </Link>
      <div className='flex items-center gap-6'>
        <div className='cursor-pointer'>
          <img src="/images/gnb/search.svg" alt="search_icon" className='w-6 h-6'/>
        </div>
        <div className='cursor-pointer'>
          <img src="/images/gnb/alert.svg" alt="alert" className='w-6 h-6'/>
        </div>
        <div className='flex items-center justify-center min-w-[123px] h-[35px]'>
          {isLoggedIn ? (
            <Link href={'/mypage'} className='flex items-center w-full h-full'>
              <img src="/images/gnb/mypage.svg" alt="mypage" className='w-6 h-6'/>
            </Link>
          ) : (
            <Link href={'/sign'} className='flex items-center justify-center px-3 py-2 text-normal text-body6 border border-normal rounded-[12px]'>
              <span>로그인 / 회원가입</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gnb;
