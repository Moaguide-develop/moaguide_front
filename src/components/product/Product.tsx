'use client';
import Container from '@/components/common/Container';
import Navbar from '@/components/common/Navbar';
import Dividend from '@/components/product/Dividend';
import Filter from '@/components/product/Filter';
import TopProduct from '@/components/product/TopProduct';
import Report from '@/components/product/Report';
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
import { useRouter, useSearchParams } from 'next/navigation';
import ProductRecruitmentSort from './sort/ProductRecruitmentSort';
import ProductEndRecruitmentSort from './sort/ProductEndRecruitmentSort';
import ProductRecruitmentContentList from './contentlist/ProductRecruitmentContentList';
import ProductEndRecruitmentContentList from './contentlist/ProductEndRecruitmentContentList';

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
  report,
  content,
  totalPages,
  pageNumber
}: IProductBuildingProps) => {
  const divideData = divide;
  const summaryData = summary;
  const reportData = report;
  const contentData = content;
  const [classification, setClassification] = useState('isdeal');
  const [sort, setSort] = useState('profit');
  const searchParams = useSearchParams();
  const sorted = searchParams.get('subcategory');

  return (
    <div className="">
      <Filter />
      <div className="w-full h-[168px] bg-gradient-to-b from-[#713ce2] to-[#5100ff]">
        <Container>
          <div className=" text-white text-base font-bold pt-[20px] mb-[30px]  ml-[10px]  desk:mb-[20px] ">
            현재 모집중인 상품
          </div>
          <div className="  flex flex-col justify-center items-center">
            <Dividend dividend={divideData} />
          </div>
        </Container>
      </div>
      <Container>
        <div className="max-w-[1000px] h-[59px] p-1 bg-white flex-col justify-center items-center gap-1 inline-flex">
          <div className="max-w-80 justify-start items-center gap-5 inline-flex">
            <div className="grow shrink basis-0">
              <span className="text-black text-lg font-bold">최근 주목 받는 상품</span>
              <span className="text-[#713ce2] text-lg font-bold ml-1">TOP 3</span>
            </div>
          </div>
        </div>
        <TopProduct summary={summaryData} />
      </Container>

      {/* <div className=" mt-[40px] mb-[40px] w-atuo h-[0px] border border-[#eceef2]" /> */}

      {/* <Container>
        <div className="text-black text-lg font-bold mb-[26px] ml-[20px]">
          관련 리포트
        </div>

        <Report report={reportData} />
      </Container> */}

      <div className=" mt-[40px] mb-[10px] w-atuo h-[1px] border border-[#eceef2]" />
      <Container>
        <ProductClassification
          classification={classification}
          setClassification={setClassification}
        />
      </Container>
      <div className=" mt-[5px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />
      <Container>
        {sorted === 'start' ? (
          <ProductRecruitmentSort sort={sort} setSort={setSort} />
        ) : sorted === 'end' ? (
          <ProductEndRecruitmentSort />
        ) : (
          <ProductIsdealSort sort={sort} setSort={setSort} />
        )}
      </Container>
      <div className=" mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

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
