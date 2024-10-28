import React, { useRef, useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import Dimmed from './Dimmed';
import { deleteUser } from '@/service/auth';
import { useRouter } from 'next/navigation';

const QuitModal = () => {
  const { setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  const [isQuitSuccessful, setIsQuitSuccessful] = useState(false);
  const router = useRouter();

  const handleQuit = async () => {
    try {
      await deleteUser();
      setIsQuitSuccessful(true);
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      setIsQuitSuccessful(false);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push('/sign');
    router.refresh();
  };

  return (
    <Dimmed>
      <div
        ref={ref}
        className="absolute z-[99999] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="px-6 py-[28px] bg-white rounded-[12px]">
          <div className="w-[290px] mx-auto">
            {isQuitSuccessful ? (
              <>
                {/* 탈퇴 성공 메시지 */}
                <div className="text-heading2 flex items-center justify-center w-full">
                  회원 탈퇴 완료
                </div>
                <div className="flex flex-col items-center mt-2 text-body4 text-gray400">
                  <div>그동안 모아가이드를 이용해주셔서</div>
                  <div>감사합니다.</div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-[28px]">
                  <div
                    onClick={handleConfirm}
                    className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 text-white bg-black rounded-[12px]">
                    확인
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 탈퇴 전 확인 메시지 */}
                <div className="text-heading2 flex items-center justify-center w-full">
                  회원 탈퇴
                </div>
                <div className="flex flex-col items-center mt-2 text-body4 text-gray400">
                  <div>탈퇴하시면 모든 정보가 삭제됩니다.</div>
                  <div>정말 탈퇴하시나요?</div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-[28px]">
                  <div
                    onClick={() => setOpen(false)}
                    className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 bg-gray100 rounded-[12px]">
                    아니요
                  </div>
                  <div
                    onClick={handleQuit}
                    className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 text-white bg-black rounded-[12px]">
                    탈퇴하기
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default QuitModal;