import Navbar from '@/components/common/Navbar';
import Dividend from '@/components/product/Dividend';
import Filter from '@/components/product/Filter';
import React from 'react';

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <Filter />
      <div className="w-full h-[168px] flex flex-col justify-center items-center bg-gradient-to-b from-[#713ce2] to-[#5100ff]">
        <div className=" max-w-[200px]  text-white text-base font-bold lg:mr-[800px] md:mr-[680px]  sm:mr-[500px] desk:mr-[270px] desk:mb-[20px] mb-[30px] ">
          최근 배당금 발표
        </div>
        <Dividend />
      </div>
      <div className="max-w-[1000px] h-[59px] p-5 bg-white flex-col justify-center items-center gap-1 inline-flex">
        <div className="max-w-80 justify-start items-center gap-5 inline-flex">
          <div className="grow shrink basis-0">
            <span className="text-black text-lg font-bold">최근 주목 받는 상품</span>
            <span className="text-[#713ce2] text-lg font-bold">TOP 3</span>
          </div>
        </div>
      </div>
      <div>캐러셀</div>

      <div className="w-atuo h-[0px] border border-[#eceef2]"></div>
      <div className="text-black text-lg font-bold">관련 리포트</div>
      <div>캐러셀</div>
    </div>
  );
};

export default ProductPage;
