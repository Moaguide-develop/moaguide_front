'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Step1 from '@/components/signup/Step1';
import Step2 from '@/components/signup/Step2';
import Step3 from '@/components/signup/Step3';
import Step4 from '@/components/signup/Step4';
import { finalSignup } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
import { useAuthStore } from '@/store/userAuth.store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage: React.FC = () => {
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    email?: string;
    name?: string;
    password?: string;
    nickname?: string;
    birthDate?: string;
    investmentExperience?: string;
    marketingConsent?: number;
    loginType: 'local' | 'social' | 'naver' | 'google' | 'kakao';
  }>({
    loginType: 'local',
  });

  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verifyToken = searchParams.get('verify');
    const email = searchParams.get('email');
    const loginType = searchParams.get('loginType') as 'naver' | 'google' | 'kakao' | null;

    if (verifyToken && email && loginType && !isSocialLogin) {
      setIsSocialLogin(true);
      setFormData((prev) => ({
        ...prev,
        email,
        loginType,
      }));

      setCookie('verify_token', verifyToken);

      setCurrentStep(4);
    }
  }, [isSocialLogin]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...data };

      if (JSON.stringify(prev) === JSON.stringify(updatedFormData)) {
        return prev;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async () => {
    try {
      const verifyToken = getCookie('verify_token');
  
      if (!verifyToken) {
        throw new Error('Verify token이 없습니다.');
      }
  
      const authHeaders = {
        cookie: '',
        Verify: verifyToken,
      };
  
      const response = await finalSignup(formData, authHeaders);
 
      if (response === '회원가입 완료') {
        alert('알림 설정은 마이페이지에서 설정 가능합니다.\n회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        router.push('/sign'); 
      }
      
    } catch (error) {
      console.error('서버 요청 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Suspense fallback={<div></div>}>
        <div className={`flex flex-col items-center justify-center`}>
          {currentStep === 1 && (
            <Step1 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
          )}
          {currentStep === 2 && (
            <Step2 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
          )}
          {currentStep === 3 && (
            <Step3 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} email={formData.email || ''} />
          )}
          {currentStep === 4 && (
            <Step4 onNext={handleSubmit} onUpdate={(data) => handleUpdate(data)} />
          )}
        </div>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default SignupPage;