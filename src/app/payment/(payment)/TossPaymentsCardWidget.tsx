'use client';

import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
// const clientKey = 'test_ck_oEjb0gm23PJxB2xw7YYkrpGwBJn5';  // 모아가이드 테스트 키
const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENT_KEY as string; // 모아가이드 테스트 키
const customerKey = uuidv4();

const TossPaymentsCardWidget = () => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey
        });
        setPayment(payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    }
    fetchPayment();
  }, []);

  async function requestBillingAuth() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.

    try {
      await payment?.requestBillingAuth({
        method: 'CARD',
        successUrl: window.location.origin + `/payment/check/confirm/successloading`,
        failUrl: window.location.origin + '/payment/check/confirm/fail',

        customerName: '김토스'
      });
    } catch (error) {
      console.error('Error requesting billing auth:', error);
    }
  }

  return { requestBillingAuth };
};

export default TossPaymentsCardWidget;
