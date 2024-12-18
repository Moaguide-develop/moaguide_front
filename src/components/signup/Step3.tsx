import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModalStore } from '@/store/modal.store';

interface StepProps {
  onNext: () => void;
  onUpdate: (data: { email?: string; password?: string }) => void;
  email: string; 
}

const Step3: React.FC<StepProps> = ({ onNext, onUpdate, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const router = useRouter();

  const { setOpen, setModalType } = useModalStore();

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
    onUpdate({ password: newPassword });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(newConfirmPassword === password);
  };

  const isFormValid = passwordValid && passwordMatch;

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
          // onClick={() => {
          //   setModalType('cancelSignup'); 
          //   setOpen(true); 
          // }}
          onClick={() => router.back()}
        />
        </div>

        <div className="w-[100%] sm:w-[330px] max-w-[330px] h-[20px] mx-auto">
        <Image
          className="mt-6 mb-6"
          src={'/sign/ProgressBar3.svg'}
          alt="ProgressBar"
          width={330}
          height={100}
          placeholder="blur"
          priority
          blurDataURL="/sign/ProgressBar3.svg"
        />
        </div>

        <h2 className="text-xl font-bold mb-6 leading-tight">
          로그인에 사용할 <br /><span className="text-purple-600">비밀번호</span>를 설정해주세요
        </h2>
        <div className="mb-4">
          <div className="text-body3">이메일</div>
          <input 
            type="email" 
            value={email} 
            disabled
            className="w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] text-body2 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <div className="text-body3">비밀번호</div>
          <input 
            type="password" 
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
            ${password ? (passwordValid ? 'outline-success' : 'focus:outline-normal') : ''}`}
          />
          {!password && (
            <p className="text-[#6E6F73] text-xs mt-2">영문, 숫자, 특수문자 포함 8-20자로 입력해주세요.</p>
          )}
          {password && passwordValid === false && (
            <p className="text-xs text-error mt-2">비밀번호 양식에 맞지 않습니다.</p>
          )}
          {passwordValid === true && (
            <p className="text-xs text-success mt-2">사용 가능한 비밀번호입니다.</p>
          )}
        </div>

        <div className="">
          <div className="text-body3">비밀번호 확인</div>
          <input 
            type="password" 
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            disabled={!passwordValid} 
            onChange={handleConfirmPasswordChange}
            className={`w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 
            ${confirmPassword ? (passwordMatch ? 'outline-success' : 'focus:outline-normal') : ''}`}
          />
          <div className="mt-2 min-h-[16px]">
            {passwordMatch === false && (
              <p className="text-xs text-error">비밀번호가 일치하지 않습니다.</p>
            )}
            {passwordMatch === true && (
              <p className="text-xs text-success">비밀번호가 일치합니다.</p>
            )}
          </div>
          </div>
        </section>

        <button 
          onClick={onNext} 
          disabled={!isFormValid} 
          className={`w-full sm:max-w-[330px] py-3 rounded-[12px] text-lg font-bold mt-0 mb-[20px] sm:mt-[40px] sm:mb-0 
          ${isFormValid ? 'bg-gradient2 text-heading4 text-white cursor-pointer' : 'bg-gray100 text-heading4 text-gray400 cursor-not-allowed'}`}
        >
          다음으로
        </button>
    </div>
  );
};

export default Step3;