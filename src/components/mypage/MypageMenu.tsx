import React from 'react';

const MypageMenu = () => {
  return (
    <div className="mt-5 flex flex-col">
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
