'use client';
import React, { useState } from 'react';
import MainListItem from './MainListItem';
import { useNavStore } from '@/store/nav.store';

const mock = [
  {
    product_Id: 'asdawd',
    category: '부동산',
    platfrom: '운영 플랫폼 이름',
    name: '롯데월드타워 시그니엘 1호',
    price: 5400,
    priceRate: 0.4,
    lastDivide_rate: 14.8,
    img: '/images/home/mock.jpeg'
  },
  {
    product_Id: 'asdawd',
    category: '부동산',
    platfrom: '운영 플랫폼 이름',
    name: '롯데월드타워 시그니엘 1호',
    price: 5400,
    priceRate: 0.4,
    lastDivide_rate: 14.8,
    img: '/images/home/mock.jpeg'
  },
  {
    product_Id: 'asdawd',
    category: '부동산',
    platfrom: '운영 플랫폼 이름',
    name: '롯데월드타워 시그니엘 1호',
    price: 5400,
    priceRate: 0.4,
    lastDivide_rate: 14.8,
    img: '/images/home/mock.jpeg'
  }
];

const MainList = () => {
  const [category, setCategory] = useState('전체');
  const { setCurrentNav } = useNavStore();

  return (
    <div>
      {/* title */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">주요 상품 현황</div>
        <div onClick={() => setCurrentNav('item')} className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* nav */}
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
      {/* item */}
      <div>
        {mock.map((item, i) => (
          <MainListItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MainList;
