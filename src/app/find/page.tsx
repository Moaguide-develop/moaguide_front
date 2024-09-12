'use client';

import Navbar from '@/components/common/Navbar';
import FindTabs from '@/components/find/FindTabs';
import React from 'react';
import { Suspense } from "react";

const FindPage = () => {
  return (
    <div>
      <FindTabs />
    </div>
  );
};

export default FindPage;
