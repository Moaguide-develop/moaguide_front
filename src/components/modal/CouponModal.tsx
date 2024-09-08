'use client';
import useOnClickOutside from '@/hook/useOnClickOutside';
import { useModalStore } from '@/store/modal.store';
import React, { useRef } from 'react';
import Dimmed from './Dimmed';

/**
 * 결제 페이지에서 쿠폰 선택 시 나타나는 모달입니다.
 */

const Couponmodal = () => {
  const { setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <Dimmed>
      <div
        ref={ref}
        className=" absolute z-[99999] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
        <div className="px-6 py-[28px] bg-white rounded-[12px]">
          <div className="w-[312px] mx-auto">
            <div className="text-heading2 flex items-center justify-center w-full">
              보유 쿠폰
            </div>
            <div className="flex flex-col items-center mt-2 text-body4 text-gray400">
              <div>사용 가능한 쿠폰이 없어요</div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-[28px]">
              <div
                onClick={() => setOpen(false)}
                className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-heading4 text-white bg-black rounded-[12px]">
                확인
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default Couponmodal;
