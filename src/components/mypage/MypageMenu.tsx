import React from 'react';
import EventGuide from './EventGuide';
import { useRouter } from 'next/navigation';

const MypageMenu = () => {
  const router = useRouter();
  const handleStartQuiz = () => {
    router.push('/quiz/start');
  };
  return (
    <div className="mt-5 flex flex-col">
      {/* 공지사항 */}
      <div
        className="flex items-center justify-between px-5 py-6"
        onClick={() => {
          router.push('mypage/notice');
        }}>
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
            onClick={() => router.push('/mypage/alarm')}
          />
        </div>
      </div>
      {/* 카카로톡 1:1 문의 */}
      {/* <div className="flex items-center justify-between px-5 py-6">
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
      </div> */}
      {/* <EventGuide /> */}
      <div className="mx-auto flex-1 rounded-[12px] w-full h-[290px] mt-[10px] bg-[#D3D3D3] cursor-pointer">
        <img
          src="/images/home/quiz-event.png"
          alt="모아가이드 투자능력고사"
          className="mx-auto rounded-[12px] object-contain"
          onClick={handleStartQuiz}
        />
        {/* <div className="absolute top-[70px] sm:top-[120px] text-white text-heading3 sm:text-heading1 ml-5 md:ml-11">
              <div>모아가이드 오픈이벤트</div>
              <div>사용후기 남기고 사은품 받자!</div>
            </div>
            <div className="absolute top-[130px] sm:top-[200px] flex items-center gap-1 ml-5 md:ml-11 mt-4 cursor-pointer max-w-max z-10">
              <div className="bg-black bg-opacity-50 rounded-[10px] p-2 flex items-center gap-1">
                <div className="ml-[5px] text-white text-body7 sm:text-body2">참여하러 가기</div>
                <div>
                  <img src="/images/home/guide_right.svg" alt="guide_right" />
                </div>
              </div> */}
      </div>
    </div>
  );
};

export default MypageMenu;
