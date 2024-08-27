'use client';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import React from 'react';
import { createPortal } from 'react-dom';
import Quitmodal from '@/components/modal/Quitmodal';

const ModalProvider = () => {
  const { open, modalType } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const $portalRoot = document.getElementById('root-portal');
  if (!$portalRoot) return null;

  return createPortal(
    <div>{open && modalType === 'secession' && <Quitmodal />}</div>,
    $portalRoot
  );
};

export default ModalProvider;
