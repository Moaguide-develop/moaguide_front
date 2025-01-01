import React from 'react';
import EventGuide from './EventGuide';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MypageMenu = () => {
  const MenuList = [
    {
      name: '구독 관리',
      img: '/images/mypage/subscribe.svg',
      routing: '/payment'
    },
    {
      name: '공지사항',
      img: '/images/mypage/notice.svg',
      routing: 'mypage/notice'
    },
    {
      name: '쿠폰 관리',
      img: '/images/mypage/coupon.svg',
      routing: 'mypage/coupon'
    },
    {
      name: '알림 설정',
      img: '/images/mypage/alarm.svg',
      routing: '/mypage/alarm'
    },
    {
      name: '결제 관리',
      img: '/images/mypage/payment.svg',
      routing: 'mypage/cardmanagement'
    }
    // ,
    // {
    //   name: '카카오톡 1:1 문의',
    //   img: '/images/mypage/chat.svg',
    //   routing: 'mypage/chat'
    // }
  ];
  // const handleStartQuiz = () => {
  //   router.push('/quiz/start');
  // };
  return (
    <div className="mt-2 flex flex-col">
      {MenuList.map((item, index) => (
        <MenuLayout key={index} item={item.name} img={item.img} routing={item.routing} />
      ))}

      {/* <EventGuide /> */}
      <div className="mx-auto flex-1 rounded-[12px] w-full h-[290px] mt-[10px] bg-[#D3D3D3] cursor-pointer">
        {/* <img
          src="/images/home/quiz-event.png"
          alt="모아가이드 투자능력고사"
          className="mx-auto rounded-[12px] object-contain"
          onClick={handleStartQuiz}
        /> */}
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

const MenuLayout = ({
  item,
  routing,
  img
}: {
  item: string;
  routing: string;
  img: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between px-5 py-6 cursor-pointer"
      onClick={() => {
        router.push(routing);
      }}>
      <div className="flex items-center gap-[14px]">
        <div>
          <Image src={img} alt={`${item} img`} width={20} height={20} />
        </div>
        <div className="text-gray700 text-body1">{item}</div>
      </div>
      <div>
        <Image
          src="/images/mypage/right_menu.svg"
          alt={`${item} right icon`}
          className="cursor-pointer"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
