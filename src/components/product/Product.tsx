'use client';
import Container from '@/components/common/Container';
import Dividend from '@/components/product/Dividend';
import Filter from '@/components/product/Filter';
import TopProduct from '@/components/product/TopProduct';
import React, { useState } from 'react';
import ProductIsdealSort from '@/components/product/sort/ProductIsdealSort';
import ProductDealContentList from '@/components/product/contentlist/ProductDealContentList';
import {
  ISummaryData,
  IReportData,
  IProductDealDetailData,
  IProductEndRecruitmentData,
  IProductRecruitmentData
} from '@/types/Diviend';
import ProductClassification from './sort/ProductClassification';
import { useSearchParams } from 'next/navigation';
import ProductRecruitmentSort from './sort/ProductRecruitmentSort';
import ProductEndRecruitmentSort from './sort/ProductEndRecruitmentSort';
import ProductRecruitmentContentList from './contentlist/ProductRecruitmentContentList';
import ProductEndRecruitmentContentList from './contentlist/ProductEndRecruitmentContentList';
import { Line } from '../common/Line';

interface IProductBuildingProps extends ISummaryData, IReportData {
  content:
    | IProductDealDetailData['product']
    | IProductEndRecruitmentData['product']
    | IProductRecruitmentData['product'];
  totalPages: IProductDealDetailData['totalPages'];
  pageNumber: IProductDealDetailData['pageable']['pageNumber'];
}

const Product = ({
  divide,
  summary,
  content,
  totalPages,
  pageNumber
}: IProductBuildingProps) => {
  const divideData = divide;
  const summaryData = summary;
  const contentData = content;
  const [classification, setClassification] = useState('isdeal');
  const [sort, setSort] = useState('profit');
  const searchParams = useSearchParams();
  const sorted = searchParams.get('subcategory');

  return (
    <div>
      <Filter />

      {/* 현재 모집중인 상품 */}
      {divideData.length ? (
        <div className="w-full h-[168px] bg-gradient-to-b from-[#713ce2] to-[#5100ff]">
          <Container>
            <Dividend dividend={divideData} />
          </Container>
        </div>
      ) : (
        <Line mb={10} />
      )}

      {/* 최근 주목받는 상품 */}
      <Container>
        <TopProduct summary={summaryData} />
      </Container>

      <Line mt={10} mb={10} />

      <Container>
        <ProductClassification
          classification={classification}
          setClassification={setClassification}
        />
      </Container>

      <Line mt={10} mb={10} />

      <Container>
        {sorted === 'start' ? (
          <ProductRecruitmentSort sort={sort} setSort={setSort} />
        ) : sorted === 'end' ? (
          <ProductEndRecruitmentSort />
        ) : (
          <ProductIsdealSort sort={sort} setSort={setSort} />
        )}
      </Container>

      <Line mt={10} mb={10} />

      {sorted === 'start' ? (
        //모집중
        <ProductRecruitmentContentList
          content={contentData as IProductRecruitmentData['product']}
          totalPages={totalPages}
          pageNumber={pageNumber}
        />
      ) : // 모집완료
      sorted === 'end' ? (
        <ProductEndRecruitmentContentList
          content={contentData as IProductEndRecruitmentData['product']}
          totalPages={totalPages}
          pageNumber={pageNumber}
        />
      ) : (
        //거래가능
        <ProductDealContentList
          content={contentData as IProductDealDetailData['product']}
          totalPages={totalPages}
          pageNumber={pageNumber}
        />
      )}
    </div>
  );
};

export default Product;
