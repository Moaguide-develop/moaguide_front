'use client';

import Navbar from '@/components/common/Navbar';
import FindPassword from '@/components/find/FindPassword';
import FindTabs from '@/components/find/FindTabs';
import React from 'react';
import { Suspense } from "react";

const FindPage = () => {
  return (
    <div>
      <FindPassword />
    </div>
  );
};

export default FindPage;
