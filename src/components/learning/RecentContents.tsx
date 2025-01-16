'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import defaultImage from '../../../public/images/learning/learning_img.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import RecentContentsSkeleton from '../skeleton/RecentContentsSkeleton';
import { useRouter } from 'next/navigation';

const RecentContents = ({ contents }: { contents: any[] }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === null) {
    return <RecentContentsSkeleton />;
  }

  return (
    <section className="relative mt-12">
      <div className="">
        <h2 className="w-[90%] sm:w-[100%] mx-auto text-lg font-bold mb-4 text-black z-10 relative">
          최신 콘텐츠
        </h2>
        {isMobile ? (
          <div className="sm:hidden mx-auto w-[100%]">
            <Swiper
              slidesPerView={1.3}
              centeredSlides={true}
              spaceBetween={16}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full mySwiper2 custom-swiper-pagination"
            >
              {contents.map((content, index) => (
                <SwiperSlide key={index} className="relative">
                  <div className="relative w-full h-[350px] bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={() => router.push(`/learning/detail/${content.articleId}`)}>
                    <Image
                      src={content.img_link || defaultImage}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white text-lg font-semibold truncate">
                        {content.title}
                      </h3>
                      <p className="text-gray-300 text-sm truncate">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination mt-4"></div>
          </div>
        ) : (
          <div className="hidden sm:grid gap-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contents.map((content, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm overflow-hidden flex flex-col bg-white cursor-pointer"
                  onClick={() => router.push(`/learning/detail/${content.articleId}`)}
                >
                  <div className="relative w-full h-[180px]">
                    <Image
                      src={content.img_link || defaultImage}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a]">
                      {content.type}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f4e5ff] text-[#6e35e8]">
                      {content.categoryName || '카테고리'}
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow px-4">
                    <h3 className="text-black text-lg font-semibold truncate mt-[16px]">
                      {content.title}
                    </h3>
                    <p className="text-[#726c6c] text-base font-semibold my-[16px] line-clamp-2">
                      {content.description}
                    </p>
                  </div>
                  <div className="mt-auto border-t px-4 py-2">
                    <button className="w-full text-center py-2 text-[#545454] text-sm font-medium">
                      {content.type === '아티클' ? '보러가기' : '재생하기'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentContents;