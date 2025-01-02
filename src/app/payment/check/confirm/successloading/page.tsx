'use client';
import { axiosInstance } from '@/service/axiosInstance';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Router } from 'express';
import { useCheckCardRegister } from '@/factory/Card/CheckCardRegister';

interface IPaymentData {
  customerKey: string;
  authKey: string;
}

const fetchPayment = async ({ customerKey, authKey }: IPaymentData) => {
  try {
    const { data } = await axiosInstance.post(
      `/card/create/card?customerKey=${customerKey}&authKey=${authKey}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    // window.location.href = `/payment/check/confirm/fail?error=${error}`;
    throw new Error('결제에 실패했습니다.');
  }
};

const PaymentSuccessLoading = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerKey = searchParams.get('customerKey');
  const authKey = searchParams.get('authKey');

  const { data, isLoading } = useCheckCardRegister();

  const fetchNextAPI = async () => {
    try {
      const { data } = await axiosInstance.post(`/billing/start`);
      console.log('다음 API 호출 성공:', data);
      return data;
    } catch (error) {
      console.error('다음 API 호출 실패:', error);
      throw new Error('추가 작업에 실패했습니다.');
    }
  };
  const mutation = useMutation({
    mutationFn: fetchPayment,
    retry: 0, // 재시도 비활성화
    onSuccess: (data) => {
      console.log('결제 성공:', data);

      fetchNextAPI()
        .then((response) => {
          console.log('연쇄 호출 성공:', response);
          router.push(`/payment/check/confirm/success?orderId=${response?.orderId}`); // 성공 시 페이지 이동
        })
        .catch((error) => {
          console.error('연쇄 호출 실패:', error);
          router.push(`/payment/check/confirm/fail`);
        });
    },
    onError: (error) => {
      console.error('결제 실패:', error);
      router.push(`/payment/check/confirm/fail`);
    },
    onSettled: () => {
      console.log('결제 요청 완료');
    }
  });
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!data?.cardName) {
      if (customerKey && authKey) {
        mutation.mutate({ customerKey, authKey });
      }
    } else {
      fetchNextAPI()
        .then((response) => {
          console.log('연쇄 호출 성공:', response);
          router.push(`/payment/check/confirm/success?orderId=${response?.orderId}`); // 성공 시 페이지 이동
        })
        .catch((error) => {
          console.error('연쇄 호출 실패:', error);
          router.push(`/payment/check/confirm/fail`);
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center ">
      {/* 중앙의 흰 배경 박스 */}
      <div className="bg-white rounded-[12px] p-6 w-[300px] flex flex-col justify-center items-center shadow-lg">
        {/* 로딩 애니메이션 */}
        <img src="/images/payment/Spinner.gif" alt="로딩 중" className=" w-24 h-24" />

        {/* 텍스트 */}
        <p className="text-gray-700 font-semibold">결제가 진행중입니다...</p>
      </div>
    </div>
  );
};

export default PaymentSuccessLoading;
