'use client';
import useOnClickOutside from '@/hook/useOnClickOutside';
import { useModalStore } from '@/store/modal.store';
import React, { useRef } from 'react';
import Dimmed from './Dimmed';

/**
 * 회원 탈퇴 클릭 시 나타나는 모달입니다.
 */

const Quitmodal = () => {
  const { setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  const handleQuit = () => {
    //Todo 탈퇴 로직 실행
  };

  return (
    <Dimmed>
      <div
        ref={ref}
        className=" absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
        <div className="px-6 py-[28px] bg-white rounded-[12px]">
          <div className="w-[312px] mx-auto">
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
                className="py-[18px] cursor-pointer  flex-1 flex items-center justify-center text-title2 bg-gray100 rounded-[12px]">
                아니요
              </div>
              <div
                onClick={handleQuit}
                className="py-[18px] cursor-pointer flex-1 flex items-center justify-center text-title2 text-white bg-black rounded-[12px]">
                탈퇴하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default Quitmodal;
