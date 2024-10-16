'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AlarmPage = () => {
  const router = useRouter();
  const [isInterestedProductAlarmOn, setIsInterestedProductAlarmOn] = useState(true);
  const [isMoaguideAlarmOn, setIsMoaguideAlarmOn] = useState(true);

  const toggleInterestedProductAlarm = () => {
    setIsInterestedProductAlarmOn(!isInterestedProductAlarmOn);
  };

  const toggleMoaguideAlarm = () => {
    setIsMoaguideAlarmOn(!isMoaguideAlarmOn);
  };

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] sm:mb-0 w-[90%] mx-auto sm:max-w-[640px]">
      <div onClick={() => router.back()} className="py-[14px]">
        <img src="/images/mypage/left.svg" alt="뒤로가기" className="cursor-pointer" />
      </div>
      <div className="text-heading3 mt-3">알림 설정</div>
      <section className="mt-10">
        <div className="flex justify-between items-center py-4">
          <span className="text-body3">관심 상품 업데이트 알림</span>
          <div
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
              isInterestedProductAlarmOn ? 'bg-gradient2' : 'bg-gray-300'
            }`}
            onClick={toggleInterestedProductAlarm}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 transition-transform ${
                isInterestedProductAlarmOn ? 'translate-x-6' : ''
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center py-4">
          <span className="text-body3">모아가이드 제공 알림</span>
          <div
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
              isMoaguideAlarmOn ? 'bg-gradient2' : 'bg-gray-300'
            }`}
            onClick={toggleMoaguideAlarm}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 transition-transform ${
                isMoaguideAlarmOn ? 'translate-x-6' : ''
              }`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlarmPage;