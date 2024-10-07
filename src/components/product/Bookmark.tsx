'use client';
import Container from '@/components/common/Container';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  IProductDealDetailData,
  IProductEndRecruitmentData,
  IProductRecruitmentData
} from '@/types/Diviend';
import ProductClassification from './ProductClassification';
import ProductBookmarkContentList from './ProductBookmarkContentList';

interface IProductBuildingProps {
  content:
    | IProductDealDetailData['product']
    | IProductEndRecruitmentData['product']
    | IProductRecruitmentData['product'];
  totalPages: IProductDealDetailData['totalPages'];
  pageNumber: IProductDealDetailData['pageable']['pageNumber'];
}

const Bookmark = ({ content, totalPages, pageNumber }: IProductBuildingProps) => {
  const contentData = content;

  const [classification, setClassification] = useState('isdeal');
  const [sort, setSort] = useState('profit');
  const searchParams = useSearchParams();
  const sorted = searchParams.get('subcategory');
  const category = searchParams.get('category');
  const router = useRouter();
  const setCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', newCategory);
    params.set('page', '1');

    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <Container>
        <div className=" ml-[10px] text-xl font-bold mt-[20px]"> 관심종목</div>
        <div className="ml-[10px] mb-3 mt-5 sm:mt-8 flex justify-between sm:justify-start items-center gap-5 border-b border-gray100 text-mobileTitle sm:text-title2 px-5 sm:px-0">
          <div
            onClick={() => {
              setCategory('all');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'all' || category == null ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            전체
          </div>
          <div
            onClick={() => {
              setCategory('building');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'building' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            부동산
          </div>
          <div
            onClick={() => {
              setCategory('music');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'music' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            음악저작권
          </div>
          <div
            onClick={() => {
              setCategory('cow');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'cow' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            한우
          </div>
          <div
            onClick={() => {
              setCategory('art');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'art' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            미술품
          </div>
          <div
            onClick={() => {
              setCategory('content');
            }}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'content' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
            콘텐츠
          </div>
        </div>

        <ProductBookmarkContentList
          content={contentData as IProductDealDetailData['product']}
          totalPages={totalPages}
          pageNumber={pageNumber}
        />
      </Container>
    </div>
  );
};

export default Bookmark;
