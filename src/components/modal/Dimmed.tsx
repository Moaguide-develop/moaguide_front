import { useModalStore } from '@/store/modal.store';
import React, { ReactNode, useRef } from 'react';

const Dimmed = ({ children }: { children: ReactNode }) => {
  const { setOpen } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      console.log('click');
      setOpen(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-gray-400 bg-opacity-30 z-50 flex justify-center items-start"
      onClick={modalOutSideClick}>
      {children}
    </div>
  );
};

export default Dimmed;
