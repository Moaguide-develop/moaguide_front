import React, { useRef } from 'react';
import { useModalStore } from '@/store/modal.store';
import Dimmed from '@/components/modal/Dimmed';
import { useRouter } from 'next/navigation';

const CancelCardModal = () => {
  const { setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dimmed>
      <div
        ref={ref}
        className="absolute z-[99999] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="px-6 py-[28px] bg-white rounded-[12px]">
          <div className="w-[270px] mx-auto">
            <div className="text-heading2 flex items-center justify-center w-full">
              결제수단 삭제
            </div>
            <div className="flex flex-col items-center mt-2 text-body4 text-gray400">
              <div>정말 삭제하시겠습니까?</div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-[28px]">
              <div
                onClick={handleCancel}
                className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 bg-gray100 rounded-[12px]">
                아니요
              </div>
              <div
                onClick={handleConfirm}
                className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 text-white bg-black rounded-[12px]">
                삭제하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default CancelCardModal;
