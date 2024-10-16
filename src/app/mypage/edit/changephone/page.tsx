'use client';
import { sendVerificationCode, verifyCode } from '@/service/auth';
import { useMemberStore } from '@/store/user.store';
import { useAuthStore } from '@/store/userAuth.store';
import { validNumberToTime } from '@/utils/validNumberToTime';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const ChangePhonePage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>(''); //전화번호
  const [phoneNumberValid, setPhoneNumberValid] = useState(false); //전화번호 유효성 검사
  const [isRequest, setIsRequest] = useState(false); //전화번호 입력 후 인증요청 상태
  const [validNumber, setValidNumber] = useState<string>(''); //인증번호
  const [validNumberOk, setValidNumberOk] = useState(false); //인증번호 유효성 검사
  const [isComplete, setIsComplete] = useState(false); // 인증번호 인증 성공
  const [isError, setIsError] = useState(false); // 인증번호 인증 실패
  const [validTime, setValidTime] = useState<number>(300); // 인증 시간
  const inputRef = useRef<HTMLInputElement>(null);
  const setMember = useMemberStore((state) => state.setMember);
  const member = useMemberStore((state) => state.member);
  const { isLoggedIn } = useAuthStore();
  

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(regex);
  };

  const handleValidNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setValidNumber(regex);
  };

  const handleRequest = async () => {
    try {
      const data = await sendVerificationCode(phoneNumber);
      setIsRequest(true);
      setValidTime(300);
    } catch (error) {
      setIsRequest(false);
    }
  };

  const handleResending = async () => {
    if (isComplete) return;
    try {
      const data = await sendVerificationCode(phoneNumber);
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
      const data = await verifyCode(phoneNumber, validNumber);
      setIsComplete(true);
      setIsError(false);
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true);
    }
  };


  const handleComplete = () => {
    setMember({
      ...member, 
      memberPhone: phoneNumber,
    });
    router.back();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

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

  // Error 상태 시 input 초기화 및 4초 후 상태 리셋
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
    <div className='min-h-[calc(100dvh-160px)] mb-[20px] sm:mb-0'>
      <div className="w-[90%] mt-5 w-full mx-auto max-w-[340px] sm:max-w-[640px] sm:mt-10 sm:px-0">
        <div onClick={() => router.back()} className="py-[14px]">
          <img src="/images/mypage/left_password.svg" alt="" className="cursor-pointer" />
        </div>
      </div>
      <section className="w-[90%] max-w-[340px] w-full mx-auto mt-0 sm:mt-[76px]">
      <div className='flex flex-col min-h-[calc(100dvh-220px)] justify-between sm:justify-center sm:min-h-0'>
        <div>
        <div className="text-heading3">
          <span className="text-normal">휴대폰 번호</span>를 인증해주세요
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
              className="flex-1 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2"
              style={{ minWidth: '0' }} 
            />
            {phoneNumberValid ? (
              isRequest ? (
                <div
                  onClick={handleResending}
                  className={`ml-[6px] px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0
                  ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                  `}>
                  재전송
                </div>
              ) : (
                <div
                  onClick={handleRequest}
                  className="ml-[6px] cursor-pointer px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0">
                  인증 요청
                </div>
              )
            ) : (
              <div className="ml-[6px] px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 flex-shrink-0">
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
              disabled={!isRequest || validTime == 0 || isComplete}
              onChange={handleValidNumberChange}
              type="text"
              placeholder="인증 번호 입력"
              className={`flex-1 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
              ${isRequest && !isComplete && !isError && 'outline-normal'}
              ${isRequest && isComplete && 'outline-success'}
              ${isRequest && isError && 'outline-error'}
              `}
              style={{ minWidth: '0' }} 
            />
            {isRequest && validNumberOk ? (
              <div
                onClick={handleCertify}
                className={` ml-[8px] px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 flex-shrink-0 
                ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                `}>
                인증 완료
              </div>
            ) : (
              <div className="ml-[8px] px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 flex-shrink-0">
                인증 완료
              </div>
            )}
          </div>
          {isRequest ? (
            <div
              className={`text-xs text-normal mt-[10px]
            ${isComplete && 'hidden'}
            ${isError && 'hidden'}
            `}>
              남은시간 : {validNumberToTime(validTime)}
            </div>
          ) : null}
          {isComplete && (
            <div className="text-xs text-success mt-[10px]">
              인증이 완료되었습니다.
            </div>
          )}
          {isError && (
            <div className="text-xs text-error mt-[10px]">
              인증번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        </div>
        {isComplete ? (
          <div
            onClick={handleComplete}
            className="cursor-pointer flex items-center justify-center px-5 py-[14px] w-full rounded-[12px] bg-gradient2 text-heading4 text-white mt-0 sm:mt-[40px]">
            변경 완료
          </div>
        ) : (
          <div className="flex items-center justify-center px-5 py-[14px] w-full rounded-[12px] bg-gray100 text-heading4 text-gray400 mt-0 sm:mt-[40px]">
            변경 완료
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default ChangePhonePage;
