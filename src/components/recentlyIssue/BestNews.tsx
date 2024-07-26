import React from 'react';
import BestNewsItem from './BestNewsItem';

const mock = [
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg',
    rank: 1
  },
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg',
    rank: 2
  },
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg',
    rank: 3
  }
];

const BestNews = () => {
  return (
    <div className="mt-[28px] pb-[28px]">
      <div className="text-heading4">👀 오늘 가장 많이 본 뉴스</div>
      <div className="mt-[28px] grid grid-cols-3 gap-5 gird">
        {mock.map((item, i) => (
          <BestNewsItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BestNews;
