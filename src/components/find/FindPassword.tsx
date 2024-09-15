import { sendEmail, verifyEmailCode } from '@/service/auth'; // 추가
import { validNumberToTime } from '@/utils/validNumberToTime';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const FindPassword = () => {
  const [email, setEmail] = useState<string>(''); // 이메일
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사
  const [isRequest, setIsRequest] = useState(false); // 인증 요청 상태
  const [verificationCode, setVerificationCode] = useState<string>(''); // 인증번호
  const [verificationCodeValid, setVerificationCodeValid] = useState(false); // 인증번호 유효성 검사
  const [isComplete, setIsComplete] = useState(false); // 인증 성공 여부
  const [isError, setIsError] = useState(false); // 인증 실패 여부
  const [validTime, setValidTime] = useState<number>(300); // 인증 시간
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value.slice(0, 6)); // 인증번호는 최대 6자리로 제한
  };

  const handleRequest = async () => {
    console.log('요청함');
    try {
      const data = await sendEmail(email);
      console.log('인증 요청 성공:', data);
      setIsRequest(true); // 인증 요청 성공 시 상태 변경
      setValidTime(300); // 인증 시간 초기화
    } catch (error) {
      console.error('인증 요청 실패:', error);
      setIsRequest(false); // 인증 요청 실패 시 상태 초기화
    }
  };

  const handleResending = async () => {
    if (isComplete) return;
    try {
      const data = await sendEmail(email);
      console.log('인증 재요청 성공:', data);
      setVerificationCode('');
      inputRef.current?.focus();
      setIsRequest(true); // 인증 요청 성공 시 상태 변경
      setValidTime(300); // 인증 시간 초기화
    } catch (error) {
      console.error('인증 재요청 실패:', error);
    }
  };

  // 인증 완료 처리 함수 추가
  const handleCertify = async () => {
    if (isComplete) return;
    try {
      const data = await verifyEmailCode(email, verificationCode);
      console.log('인증 완료:', data);
      setIsComplete(true); // 인증 성공
      setIsError(false); // 오류 상태 해제
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true); // 인증 실패 시 오류 표시
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setVerificationCodeValid(verificationCode.length === 6);
  }, [verificationCode]);

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

  const handleComplete = () => {
    if (isComplete) {
      // 인증 완료 후 추가 작업
    }
  };

  return (
    <div className='find-inner-container flex flex-col items-center min-h-[calc(100vh-220px)] w-[340px]'>
      <section className="w-full mx-auto mt-[30px]">
        <div className="text-heading3">
          <h2 className="text-xl font-bold mb-6 text-left">
            가입하신<br />
            <span className="text-purple-600">이메일</span>을 입력해주세요
          </h2>
        </div>

        <div className="mt-10">
          <div className="text-body3">이메일</div>
          <div className="flex items-center mt-2">
            <input
              type="email"
              disabled={isRequest}
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일 입력"
              className="flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"
            />
            {emailValid ? (
              isRequest ? (
                <div
                  onClick={handleResending}
                  className={`ml-[6px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2
                  ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  재전송
                </div>
              ) : (
                <div
                  onClick={handleRequest}
                  className="ml-[6px] flex-shrink-0 cursor-pointer px-4 py-[14px] bg-black rounded-[12px] text-white text-title2"
                >
                  인증 요청
                </div>
              )
            ) : (
              <div className="ml-[6px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
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
              value={verificationCode}
              disabled={!isRequest || validTime === 0 || isComplete}
              onChange={handleVerificationCodeChange}
              type="text"
              placeholder="인증 번호 입력"
              className={`flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
              ${isRequest && !isComplete && !isError && 'outline-normal'}
              ${isRequest && isComplete && 'outline-success'}
              ${isRequest && isError && 'outline-error'}
              `}
            />
            {isRequest && verificationCodeValid ? (
              <div
                onClick={handleCertify} // 인증 확인 클릭 시 처리
                className={`ml-[8px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2
                ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                인증 완료
              </div>
            ) : (
              <div className="ml-[8px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
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
      <div className='w-full max-w-[340px]'>
        {isComplete ? (
          <div
            onClick={handleComplete}
            className="cursor-pointer flex items-center justify-center px-5 py-3 mt-[60px] w-full rounded-[12px] font-bold text-lg bg-gradient2 text-heading4 text-white"
          >
            다음으로
          </div>
        ) : (
          <div className="flex items-center justify-center px-5 py-3 mt-[60px] w-full rounded-[12px] font-bold text-lg bg-gray100 text-heading4 text-gray400">
            다음으로
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPassword;
