'use client';

import React, { useState } from 'react';
import FindEmail from './FindEmail';
import ShowEmailInfo from './ShowEmailInfo';
import FindPassword from './FindPassword';

const FindTabs = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleEmailFound = () => {
    setShowEmailInfo(true); 
  };

  return (
    <div className="max-w-[340px] w-full mx-auto mt-[76px]">
      {!showEmailInfo ? ( 
        <>
          <div className="flex">
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
        </>
      ) : (
        <ShowEmailInfo /> 
      )}
    </div>
  );
};

export default FindTabs;
