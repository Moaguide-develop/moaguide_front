import { useRouter } from 'next/navigation';
import React from 'react';

const PasswordChangeSuccess = () => {
  const router = useRouter();
  return (
    <div className="pt-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <img src="/images/mypage/change_success.svg" alt="" />
        </div>
        <div className="text-heading3 flex flex-col items-center">
          <div>
            <span className="text-normal">새로운 비밀번호</span>가
          </div>
          <div>설정되었어요</div>
        </div>
        <div className="flex justify-center text-body2 text-gray400">
          다시 로그인해주세요
        </div>
      </div>
      <div
        //todo 임의로 sign으로 해놨음. 로그인 페이지로 이동하기
        onClick={() => router.replace('/sign')}
        className="cursor-pointer bg-gradient2  mt-[80px] flex justify-center items-center text-white rounded-[12px] text-title2 px-5 py-[14px] w-full">
        로그인으로 돌아가기
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
