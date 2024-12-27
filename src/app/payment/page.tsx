'use client';
import PaymentIndex from '@/components/payment/PaymentIndex';
import React from 'react';

import { usePaymentStatus } from '@/factory/Payment/paymentcheck';
import NotPaymentIndex from '@/components/payment/NotPaymentIndex';
import PaymentSkeleton from '@/components/skeleton/PaymentSkeleton';
import { IsSubscribed } from '@/utils/issubscribed';
const PaymentPage = () => {
  const { data, isLoading } = usePaymentStatus();
  const issubscribed = IsSubscribed();

  if (isLoading) {
    return (
      <div>
        <PaymentSkeleton />
      </div>
    );
  }
  return <div>{issubscribed ? <NotPaymentIndex /> : <PaymentIndex />}</div>;
};

export default PaymentPage;
