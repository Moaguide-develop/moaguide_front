'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { IDivide } from '@/types/Diviend';
import Link from 'next/link';
import { CATEGORY } from '@/static/category';

interface DividendProps {
  dividend: IDivide[];
}

// 디버깅용 목업데이터
// export const mockDividend: IDivide[] = [
//   {
//     product_Id: '12345',
//     category: 'real-estate',
//     name: 'Sample Real Estate Investment',
//     dividend: 5000,
//     dividendRate: 5.5,
//     recruitmentRate: 75
//   }
// ];

const Dividend = memo(({ dividend }: DividendProps) => {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용
  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  return (
    <div>
      <div className=" text-white text-base font-bold pt-[20px] mb-[30px]  ml-[10px]  desk:mb-[20px] ">
        현재 모집중인 상품
      </div>
      <div className="  flex flex-col justify-center items-center">
        <div className=" w-full max-w-[1000px]  mx-[50px]   z-5 flex  justify-center items-center">
          <div>
            <div
              className="flex  bg-white w-[40px] h-[40px]  justify-center items-center   z-10 rounded-full mr-[10px] cursor-pointer"
              onClick={handlePrev}>
              <Image
                src="/images/product/CaretLeft.svg"
                alt="leftarrow"
                width={20}
                height={20}
              />
            </div>
          </div>

          <Swiper
            onActiveIndexChange={(e: SwiperClass) => setSwiperIndex(e.realIndex)}
            onSwiper={(e: SwiperClass) => {
              setSwiper(e);
            }}
            loop={true}
            centeredSlides={dividend.length === 1}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              320: {
                slidesPerView: 1
              },
              480: {
                slidesPerView: 1
              },
              640: {
                slidesPerView: dividend.length === 1 ? 1 : 2
              }
            }}
            className=" flex justify-center flex-1  ">
            {dividend?.map((item) => {
              return (
                <SwiperSlide key={item.product_Id}>
                  <DividendLayout item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div>
            <div
              className="flex  bg-white w-[40px] h-[40px]  justify-center items-center    z-10 rounded-full ml-[10px] cursor-pointer"
              onClick={handleNext}>
              <Image
                src="/images/product/CaretRight.svg"
                alt="rightarrow"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dividend.displayName = 'Dividend';

export default Dividend;

const DividendLayout = ({ item }: { item: IDivide }) => {
  return (
    <Link href={`/product/detail/${item.category}/${item.product_Id}`}>
      <div className=" max-w-[456px] md:max-w-[456px]  mx-[10px] desk2:max-w-[390px]  desk:max-w-[300px] h-[84px] px-5 py-4 bg-white rounded-lg    flex  justify-center  desk:justify-start  items-center  ">
        <div className=" w-full max-w-[52px] max-h-[52px] rounded-[28.50px] ">
          <Image
            src={`https://d2qf2amuam62ps.cloudfront.net/img/${item?.product_Id}.jpg`}
            alt="Divided IMG"
            width={52}
            height={52}
            className="rounded-[8px] object-cover w-[52px] h-[52px]"
          />
        </div>

        <div className=" flex flex-col items-start justify-start md:ml-[20px] desk:ml-[16px] flex-1 ">
          <div className="">
            {CATEGORY[item.category]}
            <div className="w-full font-bold mt-1">{item.name}</div>
          </div>
          <div className=" font-bold flex justify-center items-center text-purple-600   desk:block  md:hidden">
            (모집률 {item.recruitmentRate.toLocaleString()}%)
          </div>
        </div>

        <div className="ml-[46px] font-bold flex justify-center items-center text-purple-600 mt-[20px] desk:hidden md:block  ">
          (모집률 {item.recruitmentRate.toLocaleString()}%)
        </div>
      </div>
    </Link>
  );
};
