'use client';
import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import RecentlyIssueIndex from '@/components/recentlyIssue/Index';
import { useNavStore } from '@/store/nav.store';
import React from 'react';

const Testpage = () => {
  const { currentNav } = useNavStore();
  return (
    <div>
      <Navbar />
      {currentNav === 'home' && <HomeIndex />}
      {currentNav === 'new_issue' && <RecentlyIssueIndex />}
    </div>
  );
};

export default Testpage;
