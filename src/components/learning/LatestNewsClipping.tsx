'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';
import LatestNewsClippingSkeleton from '../skeleton/LatestNewsClippingSkeleton';
import { useRouter } from 'next/navigation';
import likedIcon from '../../../public/images/learning/articleLiked.svg';
import noLikedIcon from '../../../public/images/learning/articleNoLike.svg';
import articleBackImage from '../../../public/images/learning/article_liked_background.svg';
import premiumIcon from '../../../public/images/learning/premium_article.svg';
import { useLikeStore } from '@/store/articleLike.store';
import { extractText } from '@/utils/extractText';
import { convertContentType } from '@/utils/convertContentType';

const LatestNewsClipping = ({ contents }: { contents: any[] }) => {
  const router = useRouter();
  const { getLikedState, setLikedArticle } = useLikeStore();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!contents || contents.length === 0) {
    return null;
  }

  if (isMobile === null) {
    return <LatestNewsClippingSkeleton />;
  }

  const handleContentFirstClick = (content: any) => {
    router.push(`/learning/detail/${contents[0].articleId}`);
  };

  const handleContentClick = (content: any) => {
    router.push(`/learning/detail/${content.articleId}`);
  };

  return (
    <section className="relative mt-12 mb-4">
      <h2 className="w-[90%] sm:w-[100%] mx-auto text-lg font-bold mb-6">뉴스 클리핑</h2>
      {isMobile ? (
        <div className="sm:hidden">
          {contents[0] && (
            
            <div
              className="w-full overflow-hidden mb-4 cursor-pointer relative"
              onClick={() => handleContentClick(contents[0])}
            >
              <div className='relative'>
              <Image
                src={contents[0].imgLink || defaultImage}
                alt={contents[0].title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-4 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a]">
                  {convertContentType(contents[0].type)}
                </span>
              </div>
              <div className="absolute bottom-2 right-4 w-[24px] h-[24px]">
                {(() => {
                  const likedByMe = getLikedState(contents[0].articleId) ?? contents[0].likedByMe;
                  const likedStatus = likedByMe?.liked ?? contents[0].likedByMe;
                  return (
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
                      );
                    })()}
                  </div>
              </div>
              <div className="bg-white w-[90%] sm:w-[100%] mx-auto pt-4">
                {/* <div className="w-full justify-between mb-1">
                    <span
                      className="rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a] px-2 py-1"
                      style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                    >
                      {contents[0].type || '카테고리'}
                    </span>
                    <div>{contents[0].date}</div>
                  </div> */}
                <h3 className="text-lg font-bold">{contents[0].title}</h3>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  {extractText(contents[0].description || "")}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {contents.slice(1, 5).map((content, index) => (
              <div
                key={index}
                className="flex gap-4 w-[90%] sm:w-[100%] mx-auto cursor-pointer relative"
                onClick={() => handleContentClick(content)}
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                  <Image
                    src={content.imgLink || defaultImage}
                    alt={content.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full text-[0.5rem] font-sm bg-[#ececec] text-[#8a8a8a]">
                      {convertContentType(content.type)}
                    </span>
                  </div>
                  <div className="absolute bottom-1 right-1 w-[18px] h-[18px]">
                  {(() => {
                    const likedByMe = getLikedState(content.articleId) ?? content.likedByMe;
                    const likedStatus = likedByMe?.liked ?? content.likedByMe;
                    return (
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
                            width={12}
                            height={12}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                        );
                      })()}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between my-1">
                {/* <div className="w-full justify-between">
                    <span
                      className="rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a] px-2 py-1"
                      style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                    >
                      {content.type || '카테고리'}
                    </span>
                    <div>{content.date}</div>
                  </div> */}
                  <h3 className="text-sm font-bold line-clamp-1">{content.title}</h3>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {extractText(content.description || "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[90%] mx-auto mt-8">
            <button className="w-full flex justify-center items-center rounded-3xl border border-[#8a8a8a] py-4 text-[#8a8a8a] text-sm font-bold font-['Pretendard']">
              더보기
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex gap-6">
          {contents[0] && (
            <div className="h-full flex-1 shadow-sm overflow-hidden rounded-lg border cursor-pointer"
              onClick={() => handleContentFirstClick(contents[0])}
              >
            <div className="bg-gray-200 rounded-t-lg overflow-hidden relative">
              <Image
                src={contents[0].imgLink || defaultImage}
                alt={contents[0].title}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
               <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a]">
                  {convertContentType(contents[0].type)}
                </span>
              </div>
               {contents[0].premium && (
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
                {(() => {
                  const likedByMe = getLikedState(contents[0].articleId) ?? contents[0].likedByMe;
                  const likedStatus = likedByMe?.liked ?? contents[0].likedByMe;
                  return (
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
                      );
                    })()}
                  </div>
            </div>
            <div className="bg-white p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-bold">{contents[0].title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{extractText(contents[0].description || "")}</p>
            </div>
          </div>
          )}
          <div className="flex flex-col gap-[2rem] w-1/2">
            {contents.slice(1, 5).map((content, index) => (
               <div key={index} className="flex items-stretch gap-4 cursor-pointer"
                  onClick={() => handleContentClick(content)}
                >
                <div className="w-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                  <Image
                    src={content.imgLink || defaultImage}
                    alt={content.title}
                    width={160}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                    <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full text-[0.7rem] font-sm bg-[#ececec] text-[#8a8a8a]">
                      {convertContentType(content.type)}
                    </span>
                  </div>
                   {content.premium && (
                    <div className="absolute bottom-2 left-2">
                      <Image
                        src={premiumIcon}
                          alt="프리미엄 아이콘"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                <div className="absolute bottom-2 right-2 w-[18px] h-[18px]">
                  {(() => {
                    const likedByMe = getLikedState(content.articleId) ?? content.likedByMe;
                    const likedStatus = likedByMe?.liked ?? content.likedByMe;
                    return (
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
                            width={12}
                            height={12}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                        );
                      })()}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  {/* <span
                      className="rounded-full text-xs font-medium bg-[#ececec] text-[#8a8a8a] px-2 py-1"
                      style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                    >
                      {content.type || '카테고리'}
                    </span> */}
                  <h3 className="text-md font-bold line-clamp-2 my-1">{content.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {extractText(content.description || "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestNewsClipping;