import React from 'react';

const PaymentSkeleton = () => {
  return (
    <div className="mt-5 pb-5 animate-pulse">
      {/* 상단 고정 헤더 */}
      <div className="sticky top-0 z-[999] bg-white h-[59px] shadow-custom-light border-b border-gray-100">
        <div className="py-[16px] max-w-[1000px] h-[60px] mx-auto flex items-center justify-between px-5"></div>
      </div>

      {/* 메인 섹션 */}
      <div className="px-5 mt-5 w-full mx-auto max-w-[640px]">
        {/* 구독 상태 */}
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full h-[50px]  bg-gray-300 rounded-md" />
          <div className="w-full   h-[50px] bg-gray-300 rounded-md" />
        </div>

        {/* 구독 날짜 정보 */}
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="w-1/3 h-6 bg-gray-300 rounded-md" />
              <div className="w-1/3 h-6 bg-gray-300 rounded-md" />
            </div>
          ))}
        </div>

        {/* 결제 내역 */}
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="w-1/3 h-6 bg-gray-300 rounded-md" />
              <div className="w-1/4 h-6 bg-gray-300 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="sm:hidden sticky bottom-0 z-[999999] pt-[14px] pb-[18px] px-[6px] flex items-center border-t border-gray-100 bg-white w-full">
        <div className="w-full h-[200px] bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default PaymentSkeleton;
