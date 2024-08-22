'use client';

import React, { useState } from 'react';
import FindEmail from './FindEmail';
import ShowEmailInfo from './ShowEmailInfo';

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
              className={`flex-1 text-center cursor-pointer ${activeTab === 'email' ? 'text-normal border-b-2 border-black' : 'text-gray300'}`}
              onClick={() => handleTabClick('email')}
            >
              이메일 찾기
            </div>
            <div
              className={`flex-1 text-center cursor-pointer ${activeTab === 'password' ? 'text-normal border-b-2 border-black' : 'text-gray300'}`}
              onClick={() => handleTabClick('password')}
            >
              비밀번호 찾기
            </div>
          </div>

          <div className="mt-[50px]">
            {activeTab === 'email' && <FindEmail onEmailFound={handleEmailFound} />}
            {activeTab === 'password' && (
              <div>
                {/* 비밀번호 찾기 폼 */}
                <div className="text-heading3 mb-6">
                  <span className="text-normal">휴대폰 번호</span>를 인증해주세요
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="휴대폰 번호 입력"
                    className="w-full p-4 border rounded-[12px] mb-4"
                  />
                  <button className="w-full py-3 bg-black text-white rounded-[12px]">재전송</button>
                </div>
                <div className="mb-8">
                  <input
                    type="text"
                    placeholder="인증 번호 입력"
                    className="w-full p-4 border rounded-[12px] mb-4"
                  />
                  <button className="w-full py-3 bg-black text-white rounded-[12px]">인증 완료</button>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-[12px]">
                  다음으로
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <ShowEmailInfo /> // 이메일 정보 컴포넌트를 렌더링
      )}
    </div>
  );
};

export default FindTabs;
