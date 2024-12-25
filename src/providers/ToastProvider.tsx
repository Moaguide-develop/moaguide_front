'use client';
import { useEffect, useState } from 'react';
import { useToastStore } from '@/store/toast.store';
import React from 'react';
import { createPortal } from 'react-dom';
import Toast from '@/components/other/Toast';

const ToastProvider = () => {
  const { open, message, hideToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const $portalRoot = document.getElementById('toast-portal');
  if (!$portalRoot) return null;

  return createPortal(
    <div>{open && <Toast message={message} onClose={hideToast} />}</div>,
    $portalRoot
  );
};

export default ToastProvider;
