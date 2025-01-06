import React from 'react';
import { useModalStore } from '@/store/modal.store';
import { useRouter } from 'next/navigation';
import Dimmed from '@/components/modal/Dimmed';


const SignupCompleteModal = () => {
  const { setOpen } = useModalStore();
  const router = useRouter();

  const handleConfirm = () => {
    setOpen(false);
    router.push('/sign');
  };

  return (
    <Dimmed>
      <div
        className="absolute z-[99999] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="px-6 py-[28px] bg-white rounded-[12px]">
          <div className="w-[270px] mx-auto">
            <div className="text-heading2 flex items-center justify-center w-full">
              회원가입 완료
            </div>
            <div className="flex flex-col items-center mt-2 text-body4 text-gray400 text-center">
              <div>회원가입이 완료되었습니다.</div>
              <div>알림은 마이페이지에서 설정 가능합니다.</div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-[28px]">
              <div
                onClick={handleConfirm}
                className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 text-white bg-black rounded-[12px]">
                로그인 하러가기
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default SignupCompleteModal;