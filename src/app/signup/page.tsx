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

  const [maxHeightClass, setmaxHeightClass] = useState('max-h-screen');
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setmaxHeightClass('max-h-[calc(100vh-75.5px)]');
      } else {
        setmaxHeightClass('max-h-screen');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // searchParams를 클라이언트에서만 처리
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isSocial = searchParams.get('social') === 'true';
    setIsSocialLogin(isSocial);
    setCurrentStep(isSocial ? 4 : 1);
  }, []);

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
      console.log('최종 제출 데이터:', formData);

      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token이 없습니다.');
      }

      const authHeaders = {
        cookie: '',
        Verify: accessToken,
      };

      const response = await finalSignup(formData, authHeaders);
      console.log('서버 응답 데이터:', response);
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  };

  return (
    <Suspense fallback={<div></div>}>
      <div className={`flex flex-col items-center justify-center ${maxHeightClass}`}>
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