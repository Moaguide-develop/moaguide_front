import { useRouter } from 'next/navigation';
import React from 'react';

const SubscriptionBanner = () => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-none sm:rounded-2xl px-6 py-8 sm:px-12 sm:py-16 shadow-md max-w-[1000px] mx-auto mt-12">
      <div className="text-left">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 leading-snug">
          모아가이드<br />
          플러스 구독하기
        </h2>
      </div>
      <div>
        <button className="bg-gradient2 px-8 py-4 rounded-full shadow-md hover:bg-gradient2 text-neutral-50 text-base sm:text-lg font-bold font-['Inter'] transition duration-300"
          onClick={() => router.push('/payment')}>
          첫달 무료 구독
        </button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;