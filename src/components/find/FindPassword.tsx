import Image from 'next/image';
import React, { useState } from 'react';

const FindPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className='flex flex-col justify-between items-center min-h-[calc(100vh-220px)] sm:min-h-[unset]'>
      <div className="max-w-[340px] w-full mx-auto mt-[30px]">
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
        <button 
          disabled={!email} 
          className={`flex items-center justify-center px-5 py-[14px] mt-[60px] w-full rounded-[12px] ${email ? 'bg-gradient2 text-heading4 text-white' : 'bg-gray100 text-heading4 text-gray400'}`}
        >
          다음으로
        </button>
    </div>
  );
};

export default FindPassword;