import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';

const SignLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore(); 

  const handleLogin = async () => {
    try {
      await login(email, password); 
      setIsLoggedIn(true); 
      router.push('/');
    } catch (error) {
      setErrorMessage('이메일 혹은 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex justify-center mt-8 mb-6">
        <Link href={'/'} className='cursor-pointer'>
          <img src="/images/logo.svg" alt="logo" className="w-[202px] h-[28px]" />
        </Link>
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
        <div className="flex items-center mb-4 w-[320px]">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            로그인 상태 유지
          </label>
        </div>
        <div className='min-h-[20px] my-2'>
        {errorMessage && (
          <div className="w-[320px] text-red-500 text-xs text-center">
            {errorMessage}
          </div>
        )}
        </div>
        <button 
          className="w-[320px] bg-gradient-to-r font-bold text-lg from-purple-500 to-indigo-500 text-white py-3 rounded-lg mb-4"
          onClick={handleLogin}
        >
          로그인
        </button>
        <div className="flex text-center text-gray-500 text-sm">
          <Link href={'/signup'} className='cursor-pointer'>
            <div className="mr-4">회원가입</div>
          </Link>
          <a href="/find">이메일 / 비밀번호 찾기</a>
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
