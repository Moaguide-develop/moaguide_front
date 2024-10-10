import type { MainNews } from '@/types/homeComponentsType';

import React from 'react';
import BestNewsItem from './BestNewsItem';
import { getRecentlyIssues } from '@/factory/RecentlyIssues';
import BestNewsItemSkeleton from '../skeleton/BestNewsItemSkeleton';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const BestNews = () => {
  const { data, isLoading } = getRecentlyIssues();

  return (
    <div className="pt-5 sm:pt-[28px] pb-[28px] max-w-[1000px] w-[90%] lg:w-full mx-auto">
      <div className="text-heading4">👀 오늘 가장 많이 본 뉴스</div>
      {/* 데스크톱 */}
      <div className="hidden sm:grid mt-[28px] grid-cols-3 gap-5 gird">
        {isLoading ? (
          <>
            <BestNewsItemSkeleton />
            <BestNewsItemSkeleton />
            <BestNewsItemSkeleton />
          </>
        ) : (
          data?.map((item: MainNews, i: number) => (
            <BestNewsItem key={item.id} item={item} rank={i + 1} />
          ))
        )}
      </div>
      {/* 모바일 */}
      <div className="sm:hidden">
        <Swiper
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper">
          {isLoading ? (
            <>
              <SwiperSlide>
                <BestNewsItemSkeleton />
              </SwiperSlide>
            </>
          ) : (
            data?.map((item: MainNews, i: number) => (
              <SwiperSlide key={item.id}>
                <BestNewsItem item={item} rank={i + 1} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default BestNews;
