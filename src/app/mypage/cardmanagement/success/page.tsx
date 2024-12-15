'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function CardRegisterSuccess() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  return (
    <Suspense>
      <div className="text-center h-[60vh] flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-semibold text-normal">
            카드 등록에 성공했습니다.
          </h2>
          <p className="text-gray-500 mt-4 font-semibold">등록 내역</p>

          <p className="text-body4  text-gray400 max-w-lg mx-auto mt-2">
            주문 ID: {orderId || ''}
          </p>
          <div className="mt-8">
            <button
              className="w-full bg-normal hover:shadow-lg text-white rounded-xl px-4 py-2.5"
              onClick={() => router.replace('/')}>
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
