'use client';

import Navbar from '@/components/common/Navbar';
import SignNavbar from '@/components/common/SignNavbar';
import HomeIndex from '@/components/home/Index';
import RecentlyIssueIndex from '@/components/recentlyIssue/Index';
import ReportIndex from '@/components/report/ReportIndex';
import SignLayout from '@/components/sign/SignLayout';
import { useNavStore } from '@/store/nav.store';
import React from 'react';

const SignPage = () => {
  const { currentNav } = useNavStore();
  return (
    <div>
      <SignNavbar />
      <SignLayout/>
    </div>
  );
};

export default SignPage;
