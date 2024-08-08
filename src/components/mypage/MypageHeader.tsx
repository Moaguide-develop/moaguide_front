import { useMemberStore } from '@/store/user.store';
import React from 'react';

const MypageHeader = () => {
  const { member } = useMemberStore();
  return (
    <div className="flex flex-col gap-[28px] pb-5 border-b border-gray100">
      <div className="w-full flex justify-between items-center">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="text-heading2">{member.memberNickName}</div>
          <div className="text-gray400 text-body1">{member.memberEmail}</div>
        </div>
        <div>
          <img
            src="/images/mypage/right.svg"
            alt="arrow"
            className="w-[28px] h-[28px] cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between items-center px-[21px] py-[25px] bg-gradient2 rounded-[12px]">
        <div className="text-white text-title1">{member.subscribe} 이용 중</div>
        <div>
          <img src="/images/mypage/right_white.svg" alt="" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/bookmark.svg" alt="" />
          </div>
          <div className="text-body1 text-gray700">관심종목</div>
        </div>
        <div className="flex items-center gap-[14px]">
          <div className="text-normal text-body1">24개</div>
          <div>
            <img src="/images/mypage/right_gray.svg" alt="" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageHeader;
