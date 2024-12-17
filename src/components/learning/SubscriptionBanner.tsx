import React from 'react';

const SubscriptionBanner = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-12 py-16 shadow-md max-w-[1000px] mx-auto mt-12">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-gray-800 leading-snug">
          모아가이드<br />
          플러스 구독하기
        </h2>
      </div>
      <div>
        <button className="bg-gradient2 px-8 py-4 rounded-full shadow-md hover:bg-gradient2 text-neutral-50 text-lg font-bold font-['Inter'] transition duration-300 ">
          첫달 무료 구독하기
        </button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;