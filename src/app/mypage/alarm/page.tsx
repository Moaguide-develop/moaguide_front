'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMemberStore } from '@/store/user.store'; 
import { axiosInstance } from '@/service/axiosInstance';

const AlarmPage = () => {
  const router = useRouter();
  const { member, setMember } = useMemberStore(); 

  const [isInterestedProductAlarmOn, setIsInterestedProductAlarmOn] = useState<boolean | null>(null);
  const [isMoaguideAlarmOn, setIsMoaguideAlarmOn] = useState<boolean | null>(null);

  const calculateStatus = (interestedOn: boolean, moaguideOn: boolean) => {
    if (interestedOn && moaguideOn) return 3;
    if (interestedOn && !moaguideOn) return 1;
    if (!interestedOn && moaguideOn) return 2;
    return 0;
  };

  const updateNotificationStatus = async (newInterestedOn: boolean, newMoaguideOn: boolean) => {
    const newStatus = calculateStatus(newInterestedOn, newMoaguideOn);
    
    try {
      await axiosInstance.patch(`/user/update/notify?status=${newStatus}`);
      setMember({
        ...member,
        marketing: newStatus,
      });
    } catch (error) {
      console.error('알림 상태 업데이트 실패:', error);
    }
  };

  const initializeToggles = (marketing: number) => {
    if (marketing === 0) {
      setIsInterestedProductAlarmOn(false);
      setIsMoaguideAlarmOn(false);
    } else if (marketing === 1) {
      setIsInterestedProductAlarmOn(true);
      setIsMoaguideAlarmOn(false);
    } else if (marketing === 2) {
      setIsInterestedProductAlarmOn(false);
      setIsMoaguideAlarmOn(true);
    } else if (marketing === 3) {
      setIsInterestedProductAlarmOn(true);
      setIsMoaguideAlarmOn(true);
    }
  };

  useEffect(() => {
    const marketingValue = member?.marketing ?? 0; 
    initializeToggles(marketingValue);
  }, [member]);

  const toggleInterestedProductAlarm = () => {
    const newInterestedOn = !isInterestedProductAlarmOn;
    setIsInterestedProductAlarmOn(newInterestedOn);
    updateNotificationStatus(newInterestedOn, isMoaguideAlarmOn!); 
  };

  const toggleMoaguideAlarm = () => {
    const newMoaguideOn = !isMoaguideAlarmOn;
    setIsMoaguideAlarmOn(newMoaguideOn);
    updateNotificationStatus(isInterestedProductAlarmOn!, newMoaguideOn);
  };

  if (isInterestedProductAlarmOn === null || isMoaguideAlarmOn === null) {
    return null;
  }

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