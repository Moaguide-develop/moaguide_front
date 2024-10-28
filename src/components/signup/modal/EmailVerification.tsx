import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { sendEmail, verifyEmailCode, verifyEmail } from '@/service/auth'; 
import Image from 'next/image';
import { validNumberToTime } from '@/utils/validNumberToTime';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';

interface EmailVerificationProps {
  onNext: () => void;
  onEmailChange: (email: string) => void; 
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onNext, onEmailChange }) => {
  const [email, setEmail] = useState<string>(''); 
  const [emailValid, setEmailValid] = useState(false); 
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null); 
  const [isRequest, setIsRequest] = useState(false); 
  const [verificationCode, setVerificationCode] = useState<string>(''); 
  const [verificationCodeValid, setVerificationCodeValid] = useState(false); 
  const [isComplete, setIsComplete] = useState(false); 
  const [isError, setIsError] = useState(false); 
  const [validTime, setValidTime] = useState<number>(300); 
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 

  const { setOpen, setModalType } = useModalStore();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setEmailAvailable(null); 
    onEmailChange(emailInput);
    
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    setEmailValid(isEmailValid);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  
    if (isEmailValid) {
      debounceTimeout.current = setTimeout(async () => {
        try {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
            const response = await verifyEmail(emailInput); 
            if (response.success) {
              setEmailAvailable(true); 
            } else {
              setEmailAvailable(false);
            }
          }
        } catch (error) {
          setEmailAvailable(false); 
          console.error('이메일 중복 확인 실패:', error);
        }
      }, 1000); 
    } else {
      setEmailAvailable(null); 
    }
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const codeInput = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setVerificationCode(codeInput);
    setVerificationCodeValid(codeInput.length === 6);
  };

  const handleRequestVerification = async () => {
    try {
      await sendEmail(email);
      setIsRequest(true);
      setValidTime(300);
    } catch (error) {
      console.error('인증 요청 실패:', error);
      setIsRequest(false);
    }
  };

  const handleResendVerification = async () => {
    if (isComplete) return;
    try {
      await sendEmail(email);
      setVerificationCode('');
      inputRef.current?.focus();
      setIsRequest(true);
      setValidTime(300); 
    } catch (error) {
      console.error('재요청 실패:', error);
    }
  };

  const handleVerifyCode = async () => {
    if (isComplete) return;
    try {
      await verifyEmailCode(email, verificationCode); 
      setIsComplete(true);
      setIsError(false);
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true);
    }
  };

  const handleComplete = () => {
    if (isComplete) {
      onNext();
    }
  };

  useEffect(() => {
    if (isRequest && validTime > 0 && !isComplete) {
      const intervalId = setInterval(() => {
        setValidTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (validTime === 0) {
      setIsRequest(false);
    }
  }, [isRequest, validTime, isComplete]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isError) {
      setVerificationCode('');
      inputRef.current?.focus();
      timeoutId = setTimeout(() => setIsError(false), 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [isError]);

  return (
    <div className="max-w-[330px] min-h-[calc(100dvh-75.5px)] flex flex-col items-center justify-between sm:min-h-[100vh] sm:justify-center">
      <section className="w-full mx-auto mt-[30px] sm:mt-0">
      {/* <section className="hidden sm:flex mt-8 mb-6 sm:items-center sm:justify-center">
        <Link href={'/'} className='cursor-pointer'>
          <img src="/images/logo.svg" alt="logo" className="w-[202px] h-[28px] items-center justify-center" />
        </Link>
      </section> */}
       <div style={{ width: '24px', height: '24px' }}>
        <Image
          src={'/sign/LeftArrowIcon.svg'}
          alt='뒤로가기'
          width={24}
          height={24}
          placeholder="blur"
          priority
          blurDataURL="/sign/LeftArrowIcon.svg"
          className="cursor-pointer"
          onClick={() => {
            setModalType('cancelSignup'); 
            setOpen(true); 
          }}
        />
        </div>

        <div className="w-[100%] sm:w-[330px] max-w-[330px] h-[20px] mx-auto">
        <Image
          className="mt-6 mb-6"
          src={'/sign/ProgressBar2.svg'}
          alt="ProgressBar"
          width={330}
          height={100}
          placeholder="blur"
          priority
          blurDataURL="/sign/ProgressBar2.svg"
        />
        </div>
        <div className="text-heading3">
          <h2 className="text-xl font-bold mb-6 text-left">
            회원가입을 위해<br />
            <span className="text-purple-600">이메일</span>을 인증해주세요
          </h2>
        </div>
        <div className="mt-10">
  <div className="text-body3">이메일</div>
  <div className="w-full flex items-center gap-2 mt-2">
    <input
      type="email"
      disabled={isRequest}
      value={email}
      onChange={handleEmailChange}
      placeholder="이메일 입력"
      className="min-w-0 flex-grow px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"
    />
    {emailValid && emailAvailable === true ? (
      isRequest ? (
        <div
          onClick={handleResendVerification}
          className={`min-w-[84px] text-center px-3 py-[14px] bg-black rounded-[12px] text-white text-title2 
            ${isComplete ? 'cursor-default' : 'cursor-pointer'}`}
        >
          재전송
        </div>
      ) : (
        <div
          onClick={handleRequestVerification}
          className="min-w-[84px] text-center cursor-pointer px-3 py-[14px] bg-black rounded-[12px] text-white text-title2"
        >
          인증 요청
        </div>
      )
    ) : (
      <div className="min-w-[84px] text-center px-3 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 cursor-not-allowed">
        인증 요청
      </div>
    )}
  </div>
  <div className='h-[20px] mt-2'>
    {emailAvailable === true && (
      <p className="text-xs text-success">사용 가능한 이메일입니다.</p>
    )}
    {emailAvailable === false && (
      <p className="text-xs text-error">이미 사용 중인 이메일입니다.</p>
    )}
  </div>
</div>

<div className="mt-4">
  <div className="text-body3">인증번호</div>
  <div className="w-full flex items-center gap-2 mt-2">
    <input
      ref={inputRef}
      value={verificationCode}
      disabled={!isRequest || validTime === 0 || isComplete}
      onChange={handleVerificationCodeChange}
      type="text"
      placeholder="인증 번호 입력"
      className={`min-w-0 flex-grow px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
        ${isRequest && !isComplete && !isError && 'outline-normal'}
        ${isRequest && isComplete && 'outline-success'}
        ${isRequest && isError && 'outline-error'}`}
    />
    {isRequest && verificationCodeValid ? (
      <div
        onClick={handleVerifyCode}
        className={`min-w-[84px] text-center px-3 py-[14px] bg-black rounded-[12px] text-white text-title2 
          ${isComplete ? 'cursor-default' : 'cursor-pointer'}`}
      >
        인증 완료
      </div>
    ) : (
      <div className="min-w-[84px] text-center px-3 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 cursor-not-allowed">
        인증 완료
      </div>
    )}
  </div>
  <div className='h-[14px] mt-2 pb-4'>
    {isRequest && (
      <div className={`text-xs text-normal ${isComplete && 'hidden'} ${isError && 'hidden'}`}>
        남은시간 : {validNumberToTime(validTime)}
      </div>
    )}
    {isComplete && <div className="text-xs text-success">인증이 완료되었습니다.</div>}
    {isError && <div className="text-xs text-error">인증번호가 일치하지 않습니다.</div>}
  </div>
</div>
    </section>
    <div
      onClick={handleComplete}
      className={`w-full sm:max-w-[330px] flex items-center justify-center px-5 py-3 rounded-[12px] font-bold text-lg mt-0 mb-[20px] sm:mt-[40px] sm:mb-0 
      ${isComplete ? 'bg-gradient2 text-heading4 text-white cursor-pointer' : 'bg-gray100 text-heading4 text-gray400 cursor-not-allowed'}`}
  >
    다음으로
  </div>
</div>
);
};

export default EmailVerification;