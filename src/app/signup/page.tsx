'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/common/Navbar';
import SignNavbar from '@/components/common/SignNavbar';

const Step1 = dynamic(() => import('@/components/signup/Step1'));
const Step2 = dynamic(() => import('@/components/signup/Step2'));
const Step3 = dynamic(() => import('@/components/signup/Step3'));
const Step4 = dynamic(() => import('@/components/signup/Step4'));

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = step + 1;
      setStep(nextStep);
    } else {
      alert('모든 필수 정보를 입력해주세요.');
    }
  };

  const handlePrev = () => {
    const prevStep = step - 1;
    setStep(prevStep);
  };

  const validateCurrentStep = () => {
    return true; 
  };

  useEffect(() => {
    router.replace('/signup'); 
  }, []);

  return (
    <div>
      <SignNavbar />
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onPrev={handlePrev} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Step4 onNext={handleNext} />}
    </div>
  );
};

export default SignupPage;
