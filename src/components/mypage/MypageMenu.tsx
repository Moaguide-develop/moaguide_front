import React from 'react';

const MypageMenu = () => {
  return (
    <div className="mt-5 flex flex-col">
      {/* 구독 관리 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/tag.svg" alt="구독" />
          </div>
          <div className="text-gray700 text-body1">구독 관리</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="구독"
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* 공지사항 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/notice.svg" alt="공지사항" />
          </div>
          <div className="text-gray700 text-body1">공지사항</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="공지사항"
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* 쿠폰 관리 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/ticket.svg" alt="쿠폰" />
          </div>
          <div className="text-gray700 text-body1">쿠폰 관리</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="쿠폰"
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* 알림 설정 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/bell.svg" alt="알림" />
          </div>
          <div className="text-gray700 text-body1">알림 설정</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="알림"
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* 결제 관리 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/card.svg" alt="결제" />
          </div>
          <div className="text-gray700 text-body1">결제 관리</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="결제"
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* 카카로톡 1:1 문의 */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-[14px]">
          <div>
            <img src="/images/mypage/chat.svg" alt="카카로톡" />
          </div>
          <div className="text-gray700 text-body1">카카오톡 1:1 문의</div>
        </div>
        <div>
          <img
            src="/images/mypage/right_menu.svg"
            alt="카카로톡"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MypageMenu;
