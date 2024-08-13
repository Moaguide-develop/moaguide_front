'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/common/Navbar';

const Step1 = dynamic(() => import('@/components/signup/Step1'));
const Step2 = dynamic(() => import('@/components/signup/Step2'));
const Step3 = dynamic(() => import('@/components/signup/Step3'));
const Step4 = dynamic(() => import('@/components/signup/Step4'));

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    router.push(`/signup?step=${nextStep}`);
  };

  const handlePrev = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    router.push(`/signup?step=${prevStep}`);
  };

  return (
    <div>
    <Navbar />
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onPrev={handlePrev} />}
      {step === 3 && <Step3 onNext={handleNext} onPrev={handlePrev} />}
      {step === 4 && <Step4 onPrev={handlePrev} />}
    </div>
  );
};

export default SignupPage;
