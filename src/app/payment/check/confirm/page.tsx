'use client';
import { Suspense, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  PaymentWidgetInstance,
  loadPaymentWidget
} from '@tosspayments/payment-widget-sdk';
import { useAsync } from 'react-use';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemberStore } from '@/store/user.store';
import LoaderSkeleton from '@/components/skeleton/LoaderSkeleton';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

const PaymentConfirmPage = () => {
  const { member } = useMemberStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const price = searchParams.get('totalAmount') || '0';
  const orderTitle = searchParams.get('orderTitle') as string;
  //paytodo : 유저 id 추가하기
  const customerKey = searchParams.get('customerKey') as string;
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useAsync(async () => {
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      {
        value: parseInt(price)
      },
      { variantKey: 'DEFAULT' }
    );

    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(parseInt(price));
  }, [price]);

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current;
    try {
      const uniqueOrderId = uuidv4();

      await paymentWidget
        ?.requestPayment({
          orderId: uniqueOrderId,
          orderName: orderTitle,
          customerName: member.memberNickName,
          customerEmail: member.memberEmail,
          successUrl: 'http://localhost:3000/payment/check/confirm/success',
          failUrl: 'http://localhost:3000/payment/check/confirm/fail'
        })
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            alert('결제가 종료되었습니다.');
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            alert('유효하지 않은 카드 코드입니다.');
          } else {
            alert(error?.message || '문제가 생겼습니다. 다시 시도해주세요');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense>
      <div className="max-w-2xl mx-auto px-4 my-20">
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
          <p className="text-gray-600 mb-4">
            결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일 내에
            결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러 예약을
            결제하세요.
          </p>
          {(paymentWidgetRef === null || paymentMethodsWidgetRef === null) && (
            <LoaderSkeleton />
          )}
          <div id="payment-widget" className="w-full" />
          <div id="agreement" className="w-full" />
          <div
            onClick={handleClick}
            className={` my-10 py-[18px] w-full rounded-[12px] cursor-pointer bg-gradient2 text-white flex items-center justify-center text-heading4`}>
            결제하기
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default PaymentConfirmPage;
