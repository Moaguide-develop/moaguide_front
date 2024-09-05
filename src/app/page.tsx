import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import React from 'react';

const HomePage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default HomePage;
