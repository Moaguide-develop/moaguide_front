'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Step1 from '@/app/signup/(signup)/Step1';
import Step2 from '@/app/signup/(signup)/Step2';
import Step3 from '@/app/signup/(signup)/Step3';
import Step4 from '@/app/signup/(signup)/Step4';
import { finalSignup, signupHistory } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
import { useAuthStore } from '@/store/userAuth.store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useModalStore } from '@/store/modal.store';

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
    loginType: 'local'
  });

  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const { setOpen, setModalType } = useModalStore();
  const [popstateActive, setPopstateActive] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verifyToken = searchParams.get('verify');
    const email = searchParams.get('email');
    const loginType = searchParams.get('loginType') as
      | 'naver'
      | 'google'
      | 'kakao'
      | null;

    if (verifyToken && email && loginType && !isSocialLogin) {
      setIsSocialLogin(true);
      setFormData((prev) => ({
        ...prev,
        email,
        loginType
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
        Verify: verifyToken
      };
      const response = await finalSignup(formData, authHeaders);
      if (response === '회원가입 완료') {
        setModalType('signupComplete');
        setOpen(true);
        signupHistory(formData.email || '');
      }
    } catch (error) {
      console.error('서버 요청 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const stepFromUrl = parseInt(searchParams.get('step') || '1', 10);
    setCurrentStep(stepFromUrl);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // const pushStateAndShowAlert = () => {
    //   alert('페이지를 나가시면 진행 중인 작업이 저장되지 않습니다.');
    //   window.history.pushState(null, '', window.location.href);
    // };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.history.pushState(null, '', window.location.href);
    // window.addEventListener('popstate', pushStateAndShowAlert);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // window.removeEventListener('popstate', pushStateAndShowAlert);
    };
  }, []);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!popstateActive) {
        setModalType('cancelSignup'); // 'cancelSignup' 모달 열기
        setOpen(true); // 모달 표시
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [popstateActive, setModalType, setOpen]);

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
            <Step3
              onNext={handleNext}
              onUpdate={(data) => handleUpdate(data)}
              email={formData.email || ''}
            />
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
