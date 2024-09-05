import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import React, { Suspense } from 'react';

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <HomeIndex />
      </div>
    </Suspense>
  );
};

export default HomePage;
