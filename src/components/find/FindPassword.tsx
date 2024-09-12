import Image from 'next/image';
import React, { useState } from 'react';

const FindPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className='find-inner-container flex flex-col items-center min-h-[calc(100vh-220px)] w-[340px]'>
    <div className="w-full mx-auto mt-[30px]">
      <div className="text-heading3">
          <h2 className="text-xl font-bold mb-6 text-left">
            가입하신<br />
            <span className="text-purple-600">이메일</span>을 입력해주세요
          </h2>
        </div>
        <div className="mb-4 mt-10">
          <div className="text-body3">이메일</div>
          <input 
            type="email" 
            placeholder="이메일 입력" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full mt-2 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
          />
        </div>
        </div>
        <div className='w-full max-w-[340px]'>
        <button 
          disabled={!email} 
          className={`flex items-center justify-center px-5 py-3 text-lg font-bold mt-[60px] mb-[10px] w-full rounded-[12px] ${email ? 'bg-gradient2 text-heading4 text-white' : 'bg-gray100 text-heading4 text-gray400'}`}
        >
          다음으로
        </button>
        </div>
    </div>
  );
};

export default FindPassword;