'use client';
import Quitmodal from '@/components/modal/Quitmodal';
import { useModalStore } from '@/store/modal.store';
import React from 'react';
import { createPortal } from 'react-dom';

const ModalProvider = () => {
  const { open, modalType } = useModalStore();
  const $portalRoot =
    typeof window !== 'undefined' ? document.getElementById('root-portal') : null;

  if ($portalRoot == null) {
    return null;
  }
  return createPortal(
    <div>{open && modalType === 'secession' && <Quitmodal />}</div>,
    $portalRoot
  );
};

export default ModalProvider;
