'use client';

import CertifyPassword from '@/app/mypage/(mypage)/CertifyPassword';
import NewPassword from '@/app/mypage/(mypage)/NewPassword';
import PasswordChangeSuccess from '@/app/mypage/(mypage)/PasswordChangeSuccess';
import { useAuthStore } from '@/store/userAuth.store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] sm:mb-0 w-[90%] mx-auto sm:max-w-[640px]">
      <div className="w-full mx-auto max-w-[340px] sm:max-w-[640px] sm:px-0">
        {step === 2 ? null : (
          <div onClick={() => router.back()} className="py-[14px]">
            <img
              src="/images/mypage/left_password.svg"
              alt=""
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <section className="max-w-[340px] w-full mx-auto mt-0 sm:mt-[60px]">
        {step === 0 ? <CertifyPassword setStep={setStep} /> : null}
        {step === 1 ? <NewPassword setStep={setStep} /> : null}
        {step === 2 ? <PasswordChangeSuccess /> : null}
      </section>
    </div>
  );
};

export default ChangePasswordPage;
