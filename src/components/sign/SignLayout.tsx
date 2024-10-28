import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';
import { useMemberStore } from '@/store/user.store'; 
import throttle from 'lodash/throttle'; 
import NaverLogin from './NaverLogin';
import KakaoLogin from './KakaoLogin';
import { login } from '@/service/auth';
import GoogleLogin from './GoogleLogin';
import Image from 'next/image';
import LoginButton from '../../../public/images/sign/login-btn.svg';

const SignLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [loginType, setLoginType] = useState<'local' | 'naver' | 'google' | 'kakao'>('local'); 
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();  
  const { setMember } = useMemberStore(); 

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const throttledHandleLogin = throttle(async () => {
    try {
      await login(email, password, rememberMe);
      setIsLoggedIn(true);

      setErrorMessage('');  
  
      router.push('/');
    } catch (error) {
      console.log(error);
      setErrorMessage('이메일 혹은 비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
    }
  }, 1000);

  // Enter key handler
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && email && password) {
      throttledHandleLogin();
    }
  };

  return (
    <div className="min-h-[calc(100dvh-75.5px)] flex flex-col items-center justify-center sm:min-h-[100vh]">
      <section className="flex mt-8 mb-6">
        <Link href={'/'} className='cursor-pointer'>
          <div style={{ width: '202px', height: '28px' }}>
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={202}
              height={28}
              placeholder="blur"
              priority
              blurDataURL="/images/logo.svg"
              className="cursor-pointer"
              />
          </div>
        </Link>
      </section>
      <section className="flex flex-col items-center w-[90%] sm:w-full max-w-[320px]">
        <div className="w-full mb-6">
          <div className='mb-2'>이메일</div>
          <input 
            type="email" 
            placeholder="이메일 입력" 
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}  
          />
        </div>
        <div className="w-full mb-6">
          <div className='mb-2'>비밀번호</div>
          <input 
            type="password" 
            placeholder="비밀번호 입력" 
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}  
          />
        </div>
        <div className="flex items-center w-full">
        <input 
          type="checkbox" 
          id="rememberMe" 
          checked={rememberMe} 
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2 cursor-pointer"
          style={{ accentColor: "#8b5cf6" }} 
        />
          <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
            로그인 상태 유지
          </label>
        </div>
        <div className='min-h-[20px] my-2 w-full'>
          {errorMessage && (
            <div className="w-full text-error text-xs text-center">
              {errorMessage}
            </div>
          )}
        </div>
        <div className='cursor-pointer' style={{ width: '320px', height: '52px' }}>
        <Image
          onClick={throttledHandleLogin}
          src={LoginButton}  
          alt="로그인"
          width={320}             
          height={52}        
          placeholder="blur"
          priority
          blurDataURL="sign/login-btn.svg"
        />
        </div>
        <div className="flex text-center text-gray-500 text-sm pt-4">
          <Link href={'/signup'} className='cursor-pointer'>
            <div className="mr-4">회원가입</div>
          </Link>
          <a href="/find">비밀번호 찾기</a>
        </div>
      </section>
      <section className="w-[90%] sm:w-full max-w-[320px] mx-auto items-center mt-6 flex flex-col gap-3 mb-4">
        {/* <KakaoLogin setLoginType={setLoginType} />  */}
        {/* <NaverLogin setLoginType={setLoginType} />  */}
        <GoogleLogin setLoginType={setLoginType} /> 
      </section>
    </div>
  );
};

export default SignLayout;