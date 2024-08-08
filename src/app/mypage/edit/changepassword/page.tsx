'use client';
import CertifyPassword from '@/components/mypage/CertifyPassword';
import NewPassword from '@/components/mypage/NewPassword';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  return (
    <div>
      <div className="max-w-[640px] w-full mx-auto">
        <div onClick={() => router.back()} className="py-[14px]">
          <img src="/images/mypage/left_password.svg" alt="" className="cursor-pointer" />
        </div>
      </div>
      <section className="max-w-[320px] w-full mx-auto mt-[76px]">
        {step === 0 ? <CertifyPassword setStep={setStep} /> : null}
        {step === 1 ? <NewPassword setStep={setStep} /> : null}
      </section>
    </div>
  );
};

export default ChangePasswordPage;
