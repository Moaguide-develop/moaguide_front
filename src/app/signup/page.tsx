'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { finalSignup } from '@/service/auth';

// Step 컴포넌트들을 동적 로딩으로 사용할 경우 (필요시 사용)
// const Step1 = dynamic(() => import('@/components/signup/Step1'));
// const Step2 = dynamic(() => import('@/components/signup/Step2'));
// const Step3 = dynamic(() => import('@/components/signup/Step3'));
// const Step4 = dynamic(() => import('@/components/signup/Step4'));

import Step1 from '@/components/signup/Step1';
import Step2 from '@/components/signup/Step2';
import Step3 from '@/components/signup/Step3';
import Step4 from '@/components/signup/Step4';
import Navbar from '@/components/common/Navbar';
import { Suspense } from "react";

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
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...data };
      
      // 새로운 상태와 기존 상태를 비교해 변경 사항이 없으면 업데이트를 생략합니다.
      if (JSON.stringify(prev) === JSON.stringify(updatedFormData)) {
        return prev;
      }
  
      return updatedFormData;
    });
  };
  

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async () => {
    try {
      console.log('최종 제출 데이터:', formData);

      // 로컬스토리지에서 access_token 가져오기
      const accessToken = localStorage.getItem('access_token');
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
    <div>
    <div className="flex flex-col items-center justify-center">
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
    </div>
  );
};

export default SignupPage;
