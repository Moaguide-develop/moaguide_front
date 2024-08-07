'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { useNavStore } from '@/store/nav.store';
import dynamic from 'next/dynamic';

const HomeFooter = dynamic(() => import('@/components/home/HomeFooter'), { ssr: false });

const FooterProvider = () => {
  const { currentNav } = useNavStore();
  const $portalRoot =
    typeof window !== 'undefined' ? document.getElementById('footer-portal') : null;

  if ($portalRoot == null) {
    return null;
  }
  return createPortal(<>{currentNav === 'home' && <HomeFooter />}</>, $portalRoot);
};

export default FooterProvider;
