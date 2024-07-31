'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import SwiperCore, { Navigation } from 'swiper/core';
import Image from 'next/image';

// SwiperCore.use([Navigation]);

/* eslint-disable @typescript-eslint/no-unused-vars */
const Dividend = () => {
  return (
    <div className="mt-20">
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        autoplay
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: false
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
            navigation: false
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
            navigation: false
          }
        }}
        className="mySwiper">
        {[1, 2, 3, 4].map((item) => {
          return (
            <>
              <SwiperSlide className="bg-white rounded-lg shadow-md p-4">
                <div className="md:w-[436px] desk:w-[290px] h-[84px] px-5 py-4 bg-white rounded-lg flex-row justify-start items-start gap-1 flex mx-[20px] desk:mx-[12px]">
                  <div className=" w-[52px] h-[52px] rounded-[28.50px]  ">
                    <Image
                      src="/images/product/Building1.png"
                      alt="Building"
                      width={52}
                      height={52}
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  <div className=" flex flex-col items-start justify-start md:ml-[20px] desk:ml-[16px]">
                    <div className=" text-gray-300">부동산</div>
                    <div className="text-center font-bold mt-1">
                      롯데랜드타워 시그니엘 1호
                    </div>
                  </div>

                  <div className="ml-[46px] font-bold flex justify-center items-center text-purple-600 mt-[20px]">
                    (1주당 112원)
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Dividend;
