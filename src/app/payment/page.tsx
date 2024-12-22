'use client';
import PaymentIndex from '@/components/payment/PaymentIndex';
import React from 'react';

import { usePaymentCheck } from '@/factory/Payment/paymentcheck';
import NotPaymentIndex from '@/components/payment/NotPaymentIndex';
import PaymentSkeleton from '@/components/skeleton/PaymentSkeleton';
const PaymentPage = () => {
  const { data, isLoading } = usePaymentCheck();
  console.log(data?.status);

  // return <PaymentIndex />;
  if (isLoading) {
    return (
      <div>
        <PaymentSkeleton />
      </div>
    );
  }
  return <div>{data?.status ? <NotPaymentIndex /> : <PaymentIndex />}</div>;
};

export default PaymentPage;
