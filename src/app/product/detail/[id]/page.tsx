'use client';

import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import ProductDetail from '@/components/product/detail/ProductDetail';
import Profit from '@/components/product/detail/Profit';
import Notice from '@/components/product/detail/Notice';
import Report from '@/components/product/detail/Report';
import Image from 'next/image';
import { useState } from 'react';
import { getProductDetail } from '@/factory/ProductDetail';
const Detailpage = (props: any) => {
  const [sort, setSort] = useState('profit');

  console.log(props.params.id);
  const { data, isLoading, isError } = getProductDetail(props.params.id);
  console.log(data);
  return (
    <div>
      <Container>
        <div className="flex justify-between ">
          <div className="flex justify-start">
            <Image
              src="/images/detail/Profile.png"
              width={181}
              height={181}
              alt="Profile Image"
            />

            <div className="flex flex-col ml-[28px] ">
              <div className="flex">
                <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center mb-[13px] ">
                  {data?.category === 'building' ? '부동산' : '오류'}
                </div>
                <div className="text-gray-400 ml-[3px]">{data?.platform}</div>
              </div>

              <div className="w-80 text-black text-2xl font-bold mb-[60px] ">
                {data?.name}
              </div>

              <div className="flex">
                <div className=" w-[180px] h-[49px] flex justify-center items-center border-2 border-gray-200 rounded-xl">
                  <div>해당 플랫폼으로 이동</div>
                  <Image
                    src="/images/detail/CaretRight.svg"
                    width={16}
                    height={16}
                    alt="Right Arrow"
                  />
                </div>

                <div className=" ml-[6px] w-[118px] h-[49px] flex justify-center items-center border-2 border-gray-200 rounded-xl">
                  <div>관심 종목</div>
                  <Image
                    src="/images/detail/BookmarkSimple.svg"
                    width={16}
                    height={16}
                    alt="BookMark"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="flex  w-[300px] justify-between ">
              <div className="text-gray-400">현재가</div>
              <div className="flex flex-row ">
                <div>{data?.price}</div>
                <div className="text-red-500 "> ({data?.priceRate}%)</div>
              </div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">시가총액</div>
              <div>{data?.totalPrice}</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">최근 배당금</div>
              <div>{data?.lastDivide}원</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">배당 수익률</div>
              <div className="text-red-500">{data?.lastDivideRate}%</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">배당 주기</div>
              <div>{data?.divideCycle}개월</div>
            </div>
          </div>
        </div>
      </Container>
      <NavBar sort={sort} setSort={setSort} />

      {sort === 'public' ? (
        <Notice />
      ) : sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <Profit url={props.params.id} />
      ) : sort === 'detail' ? (
        <ProductDetail />
      ) : undefined}
    </div>
  );
};

export default Detailpage;
