import { sendEmail, verifyEmailCode } from '@/service/auth'; 
import { validNumberToTime } from '@/utils/validNumberToTime';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; 
import { changePassword, changePasswordinFind } from '@/service/change';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/localStorage';

const FindPassword = () => {
  const [email, setEmail] = useState<string>(''); 
  const [emailValid, setEmailValid] = useState(false); 
  const [isRequest, setIsRequest] = useState(false); 
  const [verificationCode, setVerificationCode] = useState<string>(''); 
  const [verificationCodeValid, setVerificationCodeValid] = useState(false); 
  const [isComplete, setIsComplete] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [validTime, setValidTime] = useState<number>(300); 
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value.slice(0, 6));
  };

  const handleRequest = async () => {
    try {
      await sendEmail(email);
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
      await sendEmail(email);
      setVerificationCode('');
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
      await verifyEmailCode(email, verificationCode);
      setIsComplete(true);
      setIsError(false); 
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true); 
    }
  };

  const validatePassword = (password: string) => {
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(password);
    setPasswordValid(isValid);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    if (confirmPassword) {
      setPasswordMatch(newPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(newConfirmPassword === password);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
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
      setShowPasswordReset(true); 
    }
  };

  const handlePasswordReset = async () => {
    if (passwordMatch && passwordValid) {
      try {
        await changePasswordinFind(email, password);
        alert("비밀번호가 변경되었습니다. 새로 로그인해주세요.")
        removeToken();
        router.push('/sign');
      } catch (error) {
        console.error('비밀번호 재설정 실패:', error);
      }
    }
  };


  return (
    <div className='max-w-[330px] mx-auto min-h-[calc(100dvh-75.5px)] flex flex-col items-center justify-between sm:min-h-[100vh] sm:justify-center'>
       {!showPasswordReset && (
      <><section className="w-full mx-auto mt-[30px] sm:mt-0">
        <div className=''>
          <div className="self-start" style={{ width: '24px', height: '24px' }}>
            <Image
              src={'/sign/LeftArrowIcon.svg'}
              alt='뒤로가기'
              width={24}
              height={24}
              placeholder="blur"
              priority
              blurDataURL="/sign/LeftArrowIcon.svg"
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            </div>
        </div>
          <div className="text-heading3">
            <h2 className="text-xl font-bold my-6 text-left">
              가입하신<br />
              <span className="text-purple-600">이메일</span>을 입력해주세요
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
                className="min-w-0 flex-grow px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"/>
              {emailValid ? (
                isRequest ? (
                  <div
                    onClick={handleResending}
                    className={`min-w-[84px] text-center px-3 py-[14px] bg-black rounded-[12px] text-white text-title2
                  ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                  `}
                  >
                    재전송
                  </div>
                ) : (
                  <div
                    onClick={handleRequest}
                    className="min-w-[84px] text-center  px-3 cursor-pointer  py-[14px] bg-black rounded-[12px] text-white text-title2"
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
          </div>

          <div className="mt-[28px]">
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
              ${isRequest && isError && 'outline-error'}
              `} />
              {isRequest && verificationCodeValid ? (
                <div
                  onClick={handleCertify} 
                  className={`min-w-[84px] text-center px-3 py-[14px] bg-black rounded-[12px] text-white text-title2
                ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                `}
                >
                  인증 완료
                </div>
              ) : (
                <div className="min-w-[84px] text-center px-3 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2 cursor-not-allowed">
                  인증 완료
                </div>
              )}
            </div>
            <div className='min-h-[20px] my-2 w-full'>
            {isRequest ? (
              <div
                className={`text-xs text-normal
            ${isComplete && 'hidden'}
            ${isError && 'hidden'}
            `}
              >
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
        </section><div className='w-[90%] sm:w-full max-w-[340px]'>
            {isComplete ? (
              <div
                onClick={handleComplete}
                className="cursor-pointer flex items-center justify-center px-5 py-3 w-full rounded-[12px] font-bold text-lg bg-gradient2 text-heading4 text-white mt-0 sm:mt-[40px] mb-[20px] sm:mb-0"
              >
                다음으로
              </div>
            ) : (
              <div className="flex items-center justify-center px-5 py-3 w-full rounded-[12px] font-bold text-lg bg-gray100 text-heading4 text-gray400 mt-0 sm:mt-[40px] mb-[20px] sm:mb-0 cursor-not-allowed">
                다음으로
              </div>
            )}
          </div></>
      )}
      {showPasswordReset && (
        <><motion.div
          key="password-reset"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[330px] mx-auto"
        >
          <section>
          <div className=''>
          <div className="self-start">
            <Image
              src={'/sign/LeftArrowIcon.svg'}
              alt='뒤로가기'
              width={24}
              height={24}
              priority
              blurDataURL="/sign/LeftArrowIcon.svg"
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            </div>
        </div>
            <h2 className="text-xl font-bold my-6 text-left ">
              비밀번호를<br />
              <span className="text-purple-600">재설정</span> 해주세요
            </h2>

            <div className="mt-10">
              <div className="text-body3">새 비밀번호</div>
              <div className="flex flex-col items-center">
              <input 
                type="password" 
                placeholder="비밀번호 입력"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
                ${password ? (passwordValid ? 'outline-success' : 'focus:outline-normal') : ''}`}
              />
               {!password && (
                  <p className="w-full mr-auto text-[#6E6F73] text-xs mt-2">영문, 숫자, 특수문자 포함 8-20자로 입력해주세요.</p>
                )}
                {password && passwordValid === false && (
                  <p className="w-full mr-auto  text-error text-xs mt-2">비밀번호 양식에 맞지 않습니다.</p>
                )}
                {passwordValid === true && (
                  <p className="w-full mr-auto text-success text-xs mt-2">사용 가능한 비밀번호입니다.</p>
                )}
              </div>
            </div>

            <div className="mt-[28px]">
              <div className="text-body3">비밀번호 확인</div>
              <div className="flex flex-col items-center">
                <input 
                  type="password" 
                  placeholder="비밀번호 재입력"
                  value={confirmPassword}
                  disabled={!passwordValid} 
                  onChange={handleConfirmPasswordChange}
                  className={`w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
                  ${password ? (passwordMatch ? 'outline-success' : 'focus:outline-normal') : ''}`}
                />
                <div className="w-full mr-auto min-h-[25px]">
                  {confirmPassword && passwordMatch === false && (
                    <p className="w-full mr-auto text-error text-xs mt-2">비밀번호가 일치하지 않습니다.</p>
                  )}
                  {confirmPassword && passwordMatch === true && (
                    <p className="w-full mr-auto text-success text-xs mt-2">비밀번호가 일치합니다.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </motion.div>
        <motion.div
          key="password-reset"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[330px] mx-auto"
        >
        {passwordValid && passwordMatch ? (
          <div className="flex items-center justify-center px-5 py-3 w-full rounded-[12px] font-bold text-lg bg-gradient2 text-heading4 text-white cursor-pointer mt-0 sm:mt-[40px] mb-[20px] sm:mb-0" onClick={handlePasswordReset}>
            비밀번호 재설정
          </div>
        ) : (
          <div className="flex items-center justify-center px-5 py-3 w-full rounded-[12px] font-bold text-lg bg-gray100 text-heading4 text-gray400 mt-0 sm:mt-[40px] mb-[20px] sm:mb-0 cursor-not-allowed">
            비밀번호 재설정
          </div>
        )}
        </motion.div>
      </>
      )}
    </div>
  );
};

export default FindPassword;
