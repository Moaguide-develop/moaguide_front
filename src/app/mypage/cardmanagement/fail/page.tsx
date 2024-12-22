'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function CardRegisterFail() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  return (
    <Suspense>
      <div className="px-5 mt-5 w-full mx-auto sm:max-w-[640px] sm:mt-10 sm:px-0">
        <div className="text-center h-[60vh] flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-semibold text-normal">
              카드등록에 실패했습니다.
            </h2>
            <p className="text-gray-500 mt-4 font-semibold">
              카드 등록 도중 아래와 같은 문제가 생겼습니다. 다시 시도해주세요.
            </p>
            <p className="text-body4 text-gray400 max-w-lg mx-auto mt-8">
              에러 코드: {code || ''}
            </p>
            <p className="text-body4  text-gray400 max-w-lg mx-auto mt-2">
              에러 메세지: {message || ''}
            </p>
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
      </div>
    </Suspense>
  );
}
