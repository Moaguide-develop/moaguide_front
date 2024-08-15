'use client';

import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Profit from '@/components/product/detail/Profit';
import Public from '@/components/product/detail/Public';
import Report from '@/components/product/detail/Report';
import Image from 'next/image';
import { useState } from 'react';
const Detailpage = (props: any) => {
  const [sort, setSort] = useState('public');

  console.log(props.params.id);

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
                  부동산
                </div>
                <div className="text-gray-400 ml-[3px]">운영 플랫폼 이름</div>
              </div>

              <div className="w-80 text-black text-2xl font-bold mb-[60px] ">
                압구정 커머스 빌딩
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
                <div>5,320원</div>
                <div className="text-red-500 "> (+ 0.5%)</div>
              </div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">시가총액</div>
              <div>10,000,000</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">최근 배당금</div>
              <div>10원</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">배당 수익률</div>
              <div className="text-red-500">2.7%</div>
            </div>

            <div className="flex mt-[10px]  w-[300px] justify-between ">
              <div className="text-gray-400">배당 주기</div>
              <div>3개월</div>
            </div>
          </div>
        </div>
      </Container>
      <NavBar sort={sort} setSort={setSort} />

      {sort === 'public' ? (
        <Public />
      ) : sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <Profit />
      ) : undefined}
    </div>
  );
};

export default Detailpage;
