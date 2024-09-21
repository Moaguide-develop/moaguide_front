import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import useDebounce from '@/hook/useDebounce';
import { checkPassword } from '@/service/change';

interface CertifyPasswordType {
  setStep: Dispatch<React.SetStateAction<number>>;
}

const CertifyPassword = ({ setStep }: CertifyPasswordType) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const checkValid = (debouncedTitle: string) => {
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        debouncedTitle
      );
    setIsValid(isValidPassword);
  };

  const debouncedTitle = useDebounce(passwordValue, 800);

  useEffect(() => {
    checkValid(debouncedTitle);
  }, [debouncedTitle]);

  const handleCheckPassword = async () => {
    try {
      setIsSubmitting(true);
      const result = await checkPassword(passwordValue);

      if (result === '인증에 성공했습니다.') {
        setStep(1);
      } else {
        alert('비밀번호가 올바르지 않습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('비밀번호 검증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col min-h-[calc(100dvh-220px)] justify-between sm:justify-center sm:min-h-0'>
      <div>
      <div className="text-heading3">
        <div>현재 사용하고 계신</div>
        <div>
          <span className="text-normal">비밀번호</span>를 인증해주세요
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="text-body3">비밀번호</div>
        <input
          value={passwordValue}
          onChange={handlePasswordChange}
          type="password"
          placeholder="비밀번호 입력"
          className="px-4 py-[14px] bg-bg text-body2 rounded-[12px] w-full outline-none"
        />
      </div>
      </div>
      {isValid ? (
        <button
          onClick={handleCheckPassword} 
          className={`cursor-pointer bg-gradient2 flex justify-center items-center text-white rounded-[12px] text-title2 px-5 py-[14px] w-full mt-0 sm:mt-[50px] ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          다음으로
        </button>
      ) : (
        <button className="flex justify-center items-center bg-gray100 text-gray400 rounded-[12px] text-title2 px-5 py-[14px] w-full mt-0 sm:mt-[50px] ">
          다음으로
        </button>
      )}
    </div>
  );
};

export default CertifyPassword;
