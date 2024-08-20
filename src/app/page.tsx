import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';

// import { useNavStore } from '@/store/nav.store';
import React from 'react';

const HomePage = () => {
  // const { currentNav } = useNavStore();
  return (
    <div>
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default HomePage;
