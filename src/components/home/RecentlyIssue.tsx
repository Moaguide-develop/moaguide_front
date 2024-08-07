import React from 'react';
import IssueItem from './IssueItem';

const mock = [
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  },
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  }
];

const RecentlyIssue = () => {
  return (
    <div>
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">최신 이슈</div>
        <div className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 아이템 */}
      <div className="mt-[28px] grid grid-cols-2 gap-5 gird">
        {mock.map((item, i) => (
          <IssueItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyIssue;
