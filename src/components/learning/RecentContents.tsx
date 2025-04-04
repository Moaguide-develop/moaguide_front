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
import likedIcon from '../../../public/images/learning/articleLiked.svg';
import noLikedIcon from '../../../public/images/learning/articleNoLike.svg';
import articleBackImage from '../../../public/images/learning/article_liked_background.svg';
import premiumIcon from '../../../public/images/learning/premium_article.svg';
import { useLikeStore } from '@/store/articleLike.store';
import { extractText } from '@/utils/extractText';
import { convertContentType } from '@/utils/convertContentType';

const RecentContents = ({ contents }: { contents: any[] }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { getLikedState } = useLikeStore();

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

  const handleContentClick = (content: any) => {
    router.push(`/learning/detail/${content.articleId}`);
  };

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
              {contents.map((content, index) => {
                const likedByMe = getLikedState(content.articleId) ?? content.likedByMe;
                const likedStatus = likedByMe?.liked ?? content.likedByMe;

                return (
                  <SwiperSlide key={index} className="relative">
                    <div
                      className="relative w-full h-[350px] bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleContentClick(content)}
                    >
                      <Image
                        src={content.imgLink || defaultImage}
                        alt={content.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a]">
                            {convertContentType(content.type)}
                          </span>
                          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f4e5ff] text-[#6e35e8]">
                            {content.categoryName.replace(/[^a-zA-Z0-9가-힣\s]/g, '') || '카테고리'}
                          </span>
                        </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 pl-4 pr-12">
                        <div className='w-full mx-auto flex flex-col'>
                        <h3 className="text-white text-lg font-semibold truncate">
                          {content.title}
                        </h3>
                        <p className="text-gray-300 text-sm truncate">
                          {extractText(content.description || "")}
                        </p>
                        </div>
                      </div>
                      {content.premium && (
                          <div className="absolute top-3 right-4">
                            <Image
                              src={premiumIcon}
                              alt="프리미엄 아이콘"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                      <div className="absolute bottom-4 right-4 w-[24px] h-[24px]">
                        <div className="relative w-full h-full">
                          <Image
                            src={articleBackImage}
                            alt="articleLike"
                            layout="fill"
                            className="absolute inset-0"
                          />
                          <Image
                            src={likedStatus ? likedIcon : noLikedIcon}
                            alt={likedStatus ? 'Liked' : 'Not Liked'}
                            width={16}
                            height={16}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="swiper-pagination mt-4"></div>
          </div>
        ) : (
          <div className="hidden sm:grid gap-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contents.map((content, index) => {
                const likedByMe = getLikedState(content.articleId) ?? content.likedByMe;
                const likedStatus = likedByMe?.liked ?? content.likedByMe;

                return (
                  <div
                    key={index}
                    className="border rounded-lg shadow-sm overflow-hidden flex flex-col bg-white cursor-pointer"
                    onClick={() => handleContentClick(content)}
                  >
                    <div className="relative w-full h-[180px]">
                      <Image
                        src={content.imgLink || defaultImage}
                        alt={content.title}
                        fill
                        className="object-cover"
                      />
                       {content.premium && (
                          <div className="absolute bottom-4 left-4">
                            <Image
                              src={premiumIcon}
                              alt="프리미엄 아이콘"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4 w-[24px] h-[24px]">
                        <div className="relative w-full h-full">
                          <Image
                            src={articleBackImage}
                            alt="articleLike"
                            layout="fill"
                            className="absolute inset-0"
                          />
                          <Image
                            src={likedStatus ? likedIcon : noLikedIcon}
                            alt={likedStatus ? 'Liked' : 'Not Liked'}
                            width={16}
                            height={16}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a]">
                        {convertContentType(content.type)}
                      </span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f4e5ff] text-[#6e35e8]">
                        {content.categoryName?.replace(/[^a-zA-Z0-9가-힣\s]/g, '') || '카테고리'}
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow px-4">
                      <h3 className="text-black text-lg font-semibold truncate mt-[16px]">
                        {content.title}
                      </h3>
                      <p className="text-[#726c6c] text-base font-semibold my-[16px] line-clamp-2">
                        {extractText(content.description || "")}
                      </p>
                    </div>
                    <div className="mt-auto border-t px-4 py-2">
                      <button className="w-full text-center py-2 text-[#545454] text-sm font-medium">
                        {content.type === '아티클' ? '보러가기' : '재생하기'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentContents;