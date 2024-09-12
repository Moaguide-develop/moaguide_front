'use client';

import React, { useEffect, useState } from 'react';
import FindEmail from './FindEmail';
import ShowEmailInfo from './ShowEmailInfo';
import FindPassword from './FindPassword';
import Image from 'next/image';

const FindTabs = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleEmailFound = () => {
    setShowEmailInfo(true); 
  };

  const [minHeightClass, setMinHeightClass] = useState('min-h-screen');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMinHeightClass('min-h-[calc(100vh-100px)]');
      } else {
        setMinHeightClass('min-h-screen');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${minHeightClass}`}>
      {!showEmailInfo ? ( 
        <>
        <div className="find-container flex flex-col items-center overflow-y-auto mt-[30px] max-w-[340px]">
          <div className="self-start">
            <Image
              src={'/sign/LeftArrowIcon.svg'}
              alt='뒤로가기'
              width={24}
              height={24}
            />
        </div>
          <div className="flex max-w-[340px] w-full mx-auto mt-6">
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
          </div>

          <div className="">
            {activeTab === 'email' && <FindEmail onEmailFound={handleEmailFound} />}
            {activeTab === 'password' && <FindPassword/>}
          </div>
          </div>
        </>
      ) : (
        <ShowEmailInfo /> 
      )}
    </div>
  );
};

export default FindTabs;
