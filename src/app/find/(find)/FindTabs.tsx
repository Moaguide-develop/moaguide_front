'use client';

import React, { useEffect, useState } from 'react';
import FindEmail from './FindEmail';
import FindPassword from './FindPassword';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FindTabs = () => {
  const [activeTab, setActiveTab] = useState('email');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const router = useRouter();

  return (
    <div className='max-w-[330px] min-h-[calc(100dvh-75.5px)] flex flex-col items-center justify-between sm:min-h-[100vh] sm:justify-center'>
        <>
        <div className="flex flex-col items-center overflow-y-auto w-full">
          <div className='w-full mx-auto mt-[30px] sm:mt-0'>
          <div className="self-start">
            <Image
              src={'/sign/LeftArrowIcon.svg'}
              alt='뒤로가기'
              width={24}
              height={24}
              className='cursor-pointer'
              onClick={() => router.back()} 
            />
            </div>
        </div>
          {/* <div className="flex max-w-[340px] w-full mx-auto mt-6">
            <div
              className={`flex-1 text-center cursor-pointer pb-4 ${activeTab === 'email' ? 'font-bold border-b-2 border-purple-600' : 'text-gray300'}`}
              onClick={() => handleTabClick('email')}
            >
              이메일 찾기
            </div>
            <div
              className={`flex-1 text-center cursor-pointer pb-4 ${activeTab === 'password' ? 'font-bold border-b-2 border-purple-600' : 'text-gray300'}`}
              onClick={() => handleTabClick('password')}
            >
              비밀번호 찾기
            </div>
          </div> */}

          <div className="">
            {/* {activeTab === 'email' && <FindEmail />} */}
            {activeTab === 'password' && <FindPassword/>}
          </div>
          </div>
        </>
    </div>
  );
};

export default FindTabs;
