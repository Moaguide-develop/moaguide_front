'use client';

import Navbar from '@/components/common/Navbar';
import FindPassword from '@/app/find/(find)/FindPassword';
import FindTabs from '@/app/find/(find)/FindTabs';
import React from 'react';
import { Suspense } from 'react';

const FindPage = () => {
  return (
    <div>
      <FindPassword />
    </div>
  );
};

export default FindPage;
