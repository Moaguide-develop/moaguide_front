'use client';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import React from 'react';
import { createPortal } from 'react-dom';
import Quitmodal from '@/components/modal/Quitmodal';
import Couponmodal from '@/components/modal/CouponModal';
import CancelSignupModal from '@/app/signup/(signup)/modal/CancelSignupModal';
import SignupCompleteModal from '@/app/signup/(signup)/modal/SignupCompleteModal';
import CancelCardModal from '@/components/modal/CancelCardModal';
import CancelSubscriptionModal from '@/components/modal/CancelSubscriptionModal';

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
    <div>
      {open && modalType === 'secession' && <Quitmodal />}
      {open && modalType === 'coupon' && <Couponmodal />}
      {open && modalType === 'cancelSignup' && <CancelSignupModal />}
      {open && modalType === 'signupComplete' && <SignupCompleteModal />}
      {open && modalType === 'cancelCard' && <CancelCardModal />}
      {open && modalType === 'cancelsubScription' && <CancelSubscriptionModal />}
    </div>,
    $portalRoot
  );
};

export default ModalProvider;
