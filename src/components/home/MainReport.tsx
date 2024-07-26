import React from 'react';
import MainReportItem from './MainReportItem';

const mock = [
  {
    id: 'asdawd',
    category: '부동산',
    title: '한 달 노후생활비 얼마가 적당할까요?',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  },
  {
    id: 'asdawd',
    category: '부동산',
    title: '한 달 노후생활비 얼마가 적당할까요?',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  },
  {
    id: 'asdawd',
    category: '부동산',
    title: '한 달 노후생활비 얼마가 적당할까요?',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  }
];

const MainReport = () => {
  return (
    <div>
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">주요 리포트</div>
        <div className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 캐러셀 이미지 */}
      <div className="mt-[26px]">
        <img src="/images/home/report_main.svg" alt="" />
      </div>
      {/* 아이템 */}
      <div className="my-[28px]">
        {mock.map((item, i) => (
          <MainReportItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MainReport;
