'use client';
import Container from '@/components/common/Container';
import Navbar from '@/components/common/Navbar';
import Dividend from '@/components/product/Dividend';
import Filter from '@/components/product/Filter';
import TopProduct from '@/components/product/TopProduct';
import Report from '@/components/product/Report';
import React, { useState } from 'react';
import ProductSort from '@/components/product/ProductSort';
import ProductContentList from '@/components/product/ProductList';
import { ISummaryData, IReportData, IProductDetailData } from '@/types/Diviend';

interface IProductBuildingProps extends ISummaryData, IReportData {
  content: IProductDetailData['content'];
  totalPages: IProductDetailData['totalPages'];
  pageNumber: IProductDetailData['pageable']['pageNumber'];
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
  console.log(reportData);
  const [sort, setSort] = useState('views');
  return (
    <div>
      {/* <Navbar /> */}
      <Filter />
      <div className="w-full h-[168px] bg-gradient-to-b from-[#713ce2] to-[#5100ff]">
        <Container>
          <div className=" text-white text-base font-bold pt-[20px] mb-[30px]  ml-[10px]  desk:mb-[20px] ">
            최근 배당금 발표
          </div>
          <div className="  flex flex-col justify-center items-center">
            <Dividend dividend={divideData} />
          </div>
        </Container>
      </div>
      <Container>
        <div className="max-w-[1000px] h-[59px] p-5 bg-white flex-col justify-center items-center gap-1 inline-flex">
          <div className="max-w-80 justify-start items-center gap-5 inline-flex">
            <div className="grow shrink basis-0">
              <span className="text-black text-lg font-bold">최근 주목 받는 상품</span>
              <span className="text-[#713ce2] text-lg font-bold">TOP 3</span>
            </div>
          </div>
        </div>
        <TopProduct summary={summaryData} />
      </Container>

      <div className=" mt-[40px] mb-[40px] w-atuo h-[0px] border border-[#eceef2]"></div>

      <Container>
        <div className="text-black text-lg font-bold mb-[26px]">관련 리포트</div>

        <Report report={reportData} />
      </Container>

      <div className=" mt-[40px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]"></div>
      <Container>
        <ProductSort sort={sort} setSort={setSort} />
      </Container>
      <div className=" mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]"></div>
      <ProductContentList
        content={contentData}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default Product;
