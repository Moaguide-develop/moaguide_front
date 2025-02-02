'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const PopularContentsSkeleton = () => {
  return (
    <section className="relative mt-6 sm:mt-12">
      <div className="">
        <h2 className="w-[90%] sm:w-[100%] mx-auto text-lg font-bold mb-4 text-black z-10 relative">
          이 달의 인기 콘텐츠
        </h2>
        <div className="hidden sm:grid gap-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm overflow-hidden flex flex-col bg-gray-100 animate-pulse"
              >
                <div className="relative w-full h-[180px] bg-gray-300" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-400 w-12 h-4" />
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-400 w-16 h-4" />
                </div>
                <div className="flex flex-col flex-grow px-4">
                  <div className="h-4 bg-gray-200 rounded-md my-[16px] w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-md my-[16px] w-full" />
                </div>
                <div className="mt-auto border-t px-4 py-2">
                  <div className="w-full h-8 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:hidden mx-auto w-[100%]">
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[500px] bg-gray-300 rounded-lg animate-pulse" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularContentsSkeleton;