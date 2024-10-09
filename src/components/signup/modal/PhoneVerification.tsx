import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { sendVerificationCode, verifyCode } from '@/service/auth';
import Image from 'next/image';
import { validNumberToTime } from '@/utils/validNumberToTime';
import { useRouter } from 'next/navigation';

interface PhoneVerificationProps {
  onNext: () => void;
  onPhoneNumberChange: (number: string) => void; 
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ onNext, onPhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); 
  const [phoneNumberValid, setPhoneNumberValid] = useState(false); 
  const [isRequest, setIsRequest] = useState(false); 
  const [validNumber, setValidNumber] = useState<string>('');
  const [validNumberOk, setValidNumberOk] = useState(false); 
  const [isComplete, setIsComplete] = useState(false); 
  const [isError, setIsError] = useState(false); 
  const [validTime, setValidTime] = useState<number>(300); 
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(regex);
    onPhoneNumberChange(regex);
  };

  const handleValidNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setValidNumber(regex);
  };

  const handleRequest = async () => {
    try {
      const plainPhoneNumber = phoneNumber.replace(/-/g, '');
      await sendVerificationCode(plainPhoneNumber);
      setIsRequest(true); 
      setValidTime(300); 
    } catch (error) {
      console.error('인증 요청 실패:', error);
      setIsRequest(false);
    }
  };

  const handleResending = async () => {
    if (isComplete) return;
    try {
      const plainPhoneNumber = phoneNumber.replace(/-/g, '');
      await sendVerificationCode(plainPhoneNumber);
      setValidNumber('');
      inputRef.current?.focus();
      setIsRequest(true); 
      setValidTime(300); 
    } catch (error) {
      console.error('인증 재요청 실패:', error);
    }
  };

  const handleCertify = async () => {
    if (isComplete) return; 
    try {
      const plainPhoneNumber = phoneNumber.replace(/-/g, '');
      await verifyCode(plainPhoneNumber, validNumber);
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
    if (phoneNumber.length === 13) {
      setPhoneNumberValid(true);
    } else {
      setPhoneNumberValid(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (validNumber.length === 6) {
      setValidNumberOk(true);
    } else {
      setValidNumberOk(false);
    }
  }, [validNumber]);

  useEffect(() => {
    if (isRequest) {
      inputRef.current?.focus();
    }
  }, [isRequest]);

  useEffect(() => {
    if (isRequest && validTime > 0 && !isComplete) {
      const intervalId = setInterval(() => {
        setValidTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else if (validTime === 0) {
      setIsRequest(false);
    }
  }, [isRequest, validTime, isComplete]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isError) {
      setValidNumber('');
      inputRef.current?.focus();
      timeoutId = setTimeout(() => {
        setIsError(false);
      }, 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [isError]);

  return (
    <div className="min-h-[calc(100dvh-100px)] flex flex-col items-center justify-between mb-[100px] sm:min-h-[100vh] sm:justify-center sm:mb-0">
      <section className="max-w-[340px] w-full mx-auto mt-[30px] sm:mt-0">
        <Image
          src={'/sign/LeftArrowIcon.svg'}
          alt='뒤로가기'
          width={24}
          height={24}
          className='cursor-pointer'
          onClick={() => router.back()} 
        />
        <Image
          className="mt-6 mb-6"
          src={'/sign/ProgressBar2.svg'}
          alt="ProgressBar"
          width={360}
          height={100}
        />
        <div className="text-heading3">
          <h2 className="text-xl font-bold mb-6 text-left">
            회원가입을 위해<br />
            <span className="text-purple-600">휴대폰 번호</span>를 인증해주세요
          </h2>
        </div>
        {/* 휴대폰 번호 입력 */}
        <div className="mt-10">
          <div className="text-body3">휴대폰 번호</div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              disabled={isRequest}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="휴대폰 번호 입력"
              className="flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"
            />
            {phoneNumberValid ? (
              isRequest ? (
                <div
                  onClick={handleResending}
                  className={`ml-[6px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0 
                  ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  재전송
                </div>
              ) : (
                <div
                  onClick={handleRequest}
                  className="ml-[6px] flex-shrink-0 cursor-pointer px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0"
                >
                  인증 요청
                </div>
              )
            ) : (
              <div className="ml-[6px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 flex-shrink-0">
                인증 요청
              </div>
            )}
          </div>

        </div>
        {/* 인증번호 입력 */}
        <div className="mt-[28px]">
          <div className="text-body3">인증번호</div>
          <div className="flex items-center mt-2">
            <input
              ref={inputRef}
              value={validNumber}
              disabled={!isRequest || validTime === 0 || isComplete}
              onChange={handleValidNumberChange}
              type="text"
              placeholder="인증 번호 입력"
              className={`flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
              ${isRequest && !isComplete && !isError && 'outline-normal'}
              ${isRequest && isComplete && 'outline-success'}
              ${isRequest && isError && 'outline-error'}
              `}
            />
            {isRequest && validNumberOk ? (
              <div
                onClick={handleCertify}
                className={`ml-[8px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0 
                ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                인증 완료
              </div>
            ) : (
              <div className="ml-[8px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 flex-shrink-0">
                인증 완료
              </div>
            )}
          </div>
          {/* 남은 시간 또는 인증 완료 및 에러 메시지 */}
          {isRequest ? (
            <div
              className={`text-body7 text-normal mt-[10px]
            ${isComplete && 'hidden'}
            ${isError && 'hidden'}
            `}
            >
              남은시간 : {validNumberToTime(validTime)}
            </div>
          ) : null}
          {isComplete && (
            <div className="text-body7 text-success mt-[10px]">
              인증이 완료되었습니다.
            </div>
          )}
          {isError && (
            <div className="text-body7 text-error mt-[10px]">
              인증번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        </section>
        {isComplete ? (
          <div
            onClick={handleComplete}
            className="w-full max-w-[340px] cursor-pointer flex items-center justify-center px-5 py-3  w-full rounded-[12px] font-bold text-lg bg-gradient2 text-heading4 text-white mt-0 sm:mt-[40px]"
          >
            다음으로
          </div>
        ) : (
          <div className="w-full max-w-[340px] flex items-center justify-center px-5 py-3   w-full rounded-[12px] font-bold text-lg bg-gray100 text-heading4 text-gray400 mt-0 sm:mt-[40px]">
            다음으로
          </div>
        )}
    </div>
  );
};

export default PhoneVerification;
