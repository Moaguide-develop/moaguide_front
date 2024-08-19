import useDebounce from '@/hook/useDebounce';
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';

interface CertifyPasswordType {
  setStep: Dispatch<React.SetStateAction<number>>;
}

const CertifyPassword = ({ setStep }: CertifyPasswordType) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  //Todo : 입력된 input이 현재 비밀번호와 같은지 요청하는 API 필요 단 enabled에 isValid true일 때만

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

  return (
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
      {/* Todo : 일단 isValid가 true일때로 해놨는데, api요청 결과에 따라 확인 될때로 바꾸기 */}
      {isValid ? (
        <div
          onClick={() => setStep(1)}
          className="cursor-pointer bg-gradient2  mt-[60px] flex justify-center items-center text-white rounded-[12px] text-title2 px-5 py-[14px] w-full">
          다음으로
        </div>
      ) : (
        <div className="mt-[60px] flex justify-center items-center bg-gray100 text-gray400 rounded-[12px] text-title2 px-5 py-[14px] w-full">
          다음으로
        </div>
      )}
    </div>
  );
};

export default CertifyPassword;
