'use client';
import PaymentIndex from '@/app/payment/(payment)/PaymentIndex';
import React from 'react';

import { usePaymentStatus } from '@/factory/Payment/paymentcheck';
import NotPaymentIndex from '@/app/payment/(payment)/NotPaymentIndex';
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
