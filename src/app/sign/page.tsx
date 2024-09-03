'use client';

import Navbar from '@/components/common/Navbar';
import SignLayout from '@/components/sign/SignLayout';
import React from 'react';
import { Suspense } from "react";

const SignPage = () => {
  return (
    <div>
      <Suspense>
      <Navbar />
      </Suspense>
      <SignLayout/>
    </div>
  );
};

export default SignPage;
