import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { changePassword } from '@/service/change';

interface NewPasswordType {
  setStep: Dispatch<React.SetStateAction<number>>;
}

const NewPassword = ({ setStep }: NewPasswordType) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSame, setIsSame] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(value);
    setIsValid(isValidPassword);
  };

  const handleNewPassword2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword2(value);
  };

  useEffect(() => {
    if (isValid && newPassword && newPassword === newPassword2) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [isValid, newPassword, newPassword2]);

  const handleChangePassword = async () => {
    if (!isSame) return;

    setIsSubmitting(true); 

    try {
      const result = await changePassword(newPassword);
      if (result === 'success') {
        setStep(2); 
      } else {
        alert('비밀번호 변경 실패');
        setStep(0);
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
      setStep(0);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div>
      <div className="text-heading3">
        <div>비밀번호를</div>
        <div>
          <span className="text-normal">재설정</span> 해주세요
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="text-body3">새 비밀번호</div>
        <input
          value={newPassword}
          onChange={handleNewPassword}
          type="password"
          placeholder="비밀번호 입력"
          className={`px-4 py-[14px] bg-bg text-body2 rounded-[12px] w-full outline-none
          ${isValid && 'outline-success'}
          `}
        />
        {isValid ? (
          <div className="text-caption3 text-success ml-2">
            사용 가능한 비밀번호입니다.
          </div>
        ) : (
          <div className="text-caption3 text-gray400 ml-2">
            영문, 숫자, 특수문자 포함 8-20자로 입력해주세요.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-[28px]">
        <div className="text-body3">비밀번호 확인</div>
        <input
          value={newPassword2}
          onChange={handleNewPassword2}
          type="password"
          placeholder="비밀번호 입력"
          className={`px-4 py-[14px] bg-bg text-body2 rounded-[12px] w-full outline-none
          ${isSame && 'outline-success'}
          `}
        />
        {isSame ? (
          <div className="text-caption3 text-success ml-2">비밀번호가 일치합니다.</div>
        ) : null}
      </div>
      {/* Todo : 완료 버튼 누르면, 비밀번호 변경 요청 Api 실행, 성공 시 onSuccess setStep(2) 후 로그아웃, 실패할시 그냥 메인페이지로 이동 */}
      {isSame ? (
        <div
          onClick={handleChangePassword}
          className={`cursor-pointer bg-gradient2 flex justify-center items-center text-white rounded-[12px] text-title2 px-5 py-[14px] w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          // API 호출 중일 때 클릭 비활성화
        >
          변경 완료
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray100 text-gray400 rounded-[12px] text-title2 px-5 py-[14px] w-full">
          변경 완료
        </div>
      )}
    </div>
  );
};

export default NewPassword;
