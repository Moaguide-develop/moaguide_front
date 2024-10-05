'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Step1 from '@/components/signup/Step1';
import Step2 from '@/components/signup/Step2';
import Step3 from '@/components/signup/Step3';
import Step4 from '@/components/signup/Step4';
import { finalSignup } from '@/service/auth';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);  
  const [formData, setFormData] = useState<{
    email?: string;
    name?: string;
    password?: string;
    phoneNumber?: string;
    nickname?: string;
    birthDate?: string;
    investmentExperience?: string;
    marketingConsent?: boolean;
    loginType: 'local' | 'social';
  }>({
    loginType: 'local',
  });

  const router = useRouter();

  // URL에서 verify 토큰과 email을 추출하고 처리하는 로직
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verifyToken = searchParams.get('verify');
    const email = searchParams.get('email');
    
    if (verifyToken && email && !isSocialLogin) {
      // 소셜 로그인 사용자일 때만 상태를 업데이트
      setIsSocialLogin(true);
      setFormData((prev) => ({
        ...prev,
        email,
        loginType: 'social',
      }));

      // verifyToken을 로컬 스토리지에 저장 (토큰 저장)
      localStorage.setItem('access_token', verifyToken);

      setCurrentStep(4);  // 소셜 로그인인 경우 Step4로 이동
    }
  }, [isSocialLogin]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...data };
      
      // 상태가 이전과 같다면 업데이트하지 않음
      if (JSON.stringify(prev) === JSON.stringify(updatedFormData)) {
        return prev;
      }
  
      return updatedFormData;
    });
  };
  
  const handleSubmit = async () => {
    try {
      console.log('최종 제출 데이터:', formData);

      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token이 없습니다.');
      }

      const authHeaders = {
        cookie: '',
        Verify: accessToken,  // Verify 헤더에 JWT 토큰을 포함
      };

      const response = await finalSignup(formData, authHeaders);
      console.log('서버 응답 데이터:', response);

      // 회원가입 완료 후 페이지 이동
      router.push('/dashboard');  // 완료 후 다른 페이지로 이동
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  };

  return (
    <Suspense fallback={<div></div>}>
      <div className={`flex flex-col items-center justify-center max-h-screen`}>
        {currentStep === 1 && (
          <Step1 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 2 && (
          <Step2 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 3 && (
          <Step3 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 4 && (
          <Step4 onNext={handleSubmit} onUpdate={(data) => handleUpdate(data)} />
        )}
      </div>
    </Suspense>
  );
};

export default SignupPage;