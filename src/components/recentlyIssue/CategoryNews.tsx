import React, { useState } from 'react';
import CategoryNewsItem from './CategoryNewsItem';

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
  },
  {
    news: '한국 경제',
    title: '오피스텔 이어 또…홍록기, 16억 아파트 경매 나온 사연은 [집코노미-핫! 부동산]',
    date: '2024.06.06',
    img: '/images/home/mock.jpeg'
  }
];

const CategoryNews = () => {
  const [category, setCategory] = useState('전체');
  const [sort, setSort] = useState('recently');

  return (
    <div className="mt-5">
      <div className="mt-8 flex items-center gap-5 border-b border-gray100 text-title2">
        <div
          onClick={() => {
            setCategory('전체');
          }}
          className={`pb-5 cursor-pointer ${category === '전체' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          전체
        </div>
        <div
          onClick={() => {
            setCategory('부동산');
          }}
          className={`pb-5 cursor-pointer ${category === '부동산' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          부동산
        </div>
        <div
          onClick={() => {
            setCategory('음악저작권');
          }}
          className={`pb-5 cursor-pointer ${category === '음악저작권' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          음악저작권
        </div>
        <div
          onClick={() => {
            setCategory('한우');
          }}
          className={`pb-5 cursor-pointer ${category === '한우' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          한우
        </div>
        <div
          onClick={() => {
            setCategory('미술품');
          }}
          className={`pb-5 cursor-pointer ${category === '미술품' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          미술품
        </div>
        <div
          onClick={() => {
            setCategory('콘텐츠');
          }}
          className={`pb-5 cursor-pointer ${category === '콘텐츠' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          콘텐츠
        </div>
      </div>
      <div className="py-[10px] flex items-center gap-[10px] border-b border-gray100">
        <div className="text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('recently');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
          ${sort === 'recently' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}
          `}>
            최신순
            <img
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'recently' ? 'block' : 'hidden'}`}
            />
          </div>
          <div
            onClick={() => {
              setSort('popular');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
          ${sort === 'popular' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}
          `}>
            인기순
            <img
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'popular' ? 'block' : 'hidden'}`}
            />
          </div>
        </div>
      </div>
      <div>
        {mock.map((item, i) => (
          <CategoryNewsItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
