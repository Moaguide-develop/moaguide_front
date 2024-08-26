'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { memo, useState } from 'react';
import { ISummary } from '@/types/Diviend';
import Link from 'next/link';

interface TopProductProps {
  summary: ISummary[];
}

// 최근 주목받는 상품 api 받아오기
const TopProduct = memo(({ summary }: TopProductProps) => {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용

  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  SwiperCore.use([Navigation, Scrollbar, Autoplay, Pagination]);
  return (
    <div className="relative  h-[400px] ">
      <div className=" flex flex-row justify-center items-center   ">
        <div>
          <div
            className="flex  bg-white w-[40px] h-[40px]  justify-center items-center   z-10 rounded-full mr-[10px] desk:hidden md:block"
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
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ el: '.swiper-pagination', clickable: true, enabled: false }}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false // 사용자 상호작용시 슬라이더 일시 정지 비활성
          // }}
          // navigation
          modules={[Navigation, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              pagination: { el: '.swiper-pagination', clickable: true, enabled: true }
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
              pagination: { el: '.swiper-pagination', clickable: true, enabled: true }
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
              pagination: { el: '.swiper-pagination', clickable: true, enabled: false }
            }
          }}
          className="mySwiper flex justify-center">
          {summary?.map((item, idx) => {
            return (
              <div key={item.product_Id}>
                <SwiperSlide>
                  <Link href={`/product/detail/${item.product_Id}`}>
                    <div className=" max-w-[436px] h-[372px] border-2 border-gray-200 rounded-md ">
                      <div className="flex flex-col justify-center items-center mt-[20px] mx-auto">
                        <div className="relative  ">
                          <div className="max-w-[396px] h-[237px] ">
                            <Image
                              src="/images/product/ProductBuilding.png"
                              alt="Building"
                              width={396}
                              height={237}
                            />
                          </div>
                          <div className="absolute top-1 left-1">
                            <div className="relative">
                              <Image
                                src="/images/product/BookmarkSimple.svg"
                                alt="Building"
                                width={44}
                                height={44}></Image>
                              <div className="text-white absolute top-2 left-[18px] ">
                                {idx + 1}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full ">
                          <div className="flex  mt-[13px] ml-[20px]">
                            <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center ">
                              부동산
                            </div>
                            <div className="text-gray-400 ml-[3px]">{item.platform}</div>
                          </div>
                          <div className="flex justify-between mt-[10px]  w-full max-w-[375px] ml-[20px] ">
                            <div className="font-bold text-base">{item.name}</div>
                            <div className="text-red-500 bg-red-200 rounded-md w-auto h-[25px] flex justify-center items-center px-[4px] py-[4px]">
                              {item.priceRate}%
                            </div>
                          </div>

                          <div className="flex mt-[10px ] ml-[20px]">
                            <div className="text-gray-400">{item.price}</div>
                            <div className="text-red-500 ml-[3px] ">
                              (+ {item.lastDivide_rate}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>

        <div>
          <div
            className="flex  bg-white w-[40px] h-[40px]  justify-center items-center  z-10 rounded-full ml-[10px] desk:hidden md:block"
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
      <div className="swiper-pagination w-full flex justify-center"></div>
    </div>
  );
});

TopProduct.displayName = 'TopProduct';

export default TopProduct;
