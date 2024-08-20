'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { finalSignup } from '@/service/auth';
import { getCookie } from '@/utils/cookies';

import Step1 from '@/components/signup/Step1';

import Step2 from '@/components/signup/Step2';

import Step3 from '@/components/signup/Step3';

import Step4 from '@/components/signup/Step4';

// const Step1 = dynamic(() => import('@/components/signup/Step1'));
// const Step2 = dynamic(() => import('@/components/signup/Step2'));
// const Step3 = dynamic(() => import('@/components/signup/Step3'));
// const Step4 = dynamic(() => import('@/components/signup/Step4'));

const SignupPage: React.FC = () => {
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
    loginType: 'local';
  }>({
    loginType: 'local'
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async () => {
    try {
      console.log('최종 제출 데이터:', formData);

      const accessToken = getCookie('access_token');
      if (!accessToken) {
        throw new Error('Access token이 없습니다.');
      }

      const authHeaders = {
        cookie: '',
        authorization: `Bearer ${accessToken}`
      };

      const response = await finalSignup(formData, authHeaders);
      console.log('서버 응답 데이터:', response);
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  };

  return (
    <div className="signup-container">
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
  );
};

export default SignupPage;
