import Image from 'next/image';
import React, { useState } from 'react';

interface StepProps {
  onNext: () => void;
  onUpdate: (data: { email?: string; password?: string }) => void;
}

const Step3: React.FC<StepProps> = ({ onNext, onUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

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

  const isFormValid = email && passwordValid && passwordMatch;

  return (
    <div className="flex flex-col justify-between items-center min-h-[calc(100vh-160px)]">
      <div className="max-w-[340px] w-full mx-auto mt-[76px]">
        <Image
          className='mb-12'
          src={'/sign/ProgressBar3.svg'}
          alt="ProgressBar"
          width={360}
          height={100}
        />
        <h2 className="text-xl font-bold mb-6 leading-tight">
          가입할 <span className="text-purple-600">로그인 정보</span>를<br />입력해주세요
        </h2>

        <div className="mb-4">
          <div className="text-body3">이메일</div>
          <input 
            type="email" 
            placeholder="이메일 입력" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onUpdate({ email: e.target.value });
            }}
            className="w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
          />
        </div>

        <div className="mb-4">
          <div className="text-body3">비밀번호</div>
          <input 
            type="password" 
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            className="w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
          />
          {!password && (
            <p className="text-[#6E6F73] text-xs mt-2">영문, 숫자, 특수문자 포함 8-20자로 입력해주세요.</p>
          )}
          {password && passwordValid === false && (
            <p className="text-red-500 text-xs mt-2">비밀번호 양식에 맞지 않습니다.</p>
          )}
          {passwordValid === true && (
            <p className="text-blue-500 text-xs mt-2">사용 가능한 비밀번호입니다.</p>
          )}
        </div>

        <div className="mb-12">
          <div className="text-body3">비밀번호 확인</div>
          <input 
            type="password" 
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full mt-4 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
          />
          <div className="mt-1 min-h-[25px]">
            {passwordMatch === false && (
              <p className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</p>
            )}
            {passwordMatch === true && (
              <p className="text-blue-500 text-xs">비밀번호가 일치합니다.</p>
            )}
          </div>
        </div>
        </div>

        <button 
          onClick={onNext} 
          disabled={!isFormValid} 
          className={`w-full max-w-[340px] py-3 rounded-lg text-lg ${isFormValid ? 'bg-gradient2 text-heading4 text-white' : 'bg-gray100 text-heading4 text-gray400'}`}
        >
          다음으로
        </button>
    </div>
  );
};

export default Step3;
