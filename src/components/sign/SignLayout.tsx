import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/auth';

const SignLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password); 
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="w-full flex items-center justify-center border-b border-gray100">
      </nav>
      <section className="flex justify-center mt-24 mb-12">
        <img src="/images/logo.svg" alt="logo" className="w-[202px] h-[28px]" />
      </section>
      <section className="flex flex-col items-center w-full px-4">
        <div className="mb-6">
          <div className='mb-2'>이메일</div>
          <input 
            type="email" 
            placeholder="이메일 입력" 
            className="w-[320px] p-4 rounded-lg border border-gray-300 bg-gray-50 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div className='mb-2'>비밀번호</div>
          <input 
            type="password" 
            placeholder="비밀번호 입력" 
            className="w-[320px] p-4 rounded-lg border border-gray-300 bg-gray-50 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-6 w-[320px]">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            로그인 상태 유지
          </label>
        </div>
        <button 
          className="w-[320px] bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg text-sm font-semibold mb-4"
          onClick={handleLogin}
        >
          로그인
        </button>
        <div className="flex text-center text-gray-500 text-sm">
          <Link href={'/signup'} className='cursor-pointer'>
            <div className="mr-4">회원가입</div>
          </Link>
          <a href="/forgot-password">이메일 / 비밀번호 찾기</a>
        </div>
      </section>
      <section className="mt-8">
        {/* <SocialLoginButtons /> */}
      </section>
      <div className="h-12" />
    </div>
  );
};

export default SignLayout;
