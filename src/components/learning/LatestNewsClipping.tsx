'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';
import LatestNewsClippingSkeleton from '../skeleton/LatestNewsClippingSkeleton';
import { useRouter } from 'next/navigation';

const LatestNewsClipping = ({ contents }: { contents: any[] }) => {
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

  if (!contents || contents.length === 0) {
    return null;
  }

  if (isMobile === null) {
    return <LatestNewsClippingSkeleton />;
  }

  return (
    <section className="relative mt-12 mb-4">
      <h2 className="w-[90%] sm:w-[100%] mx-auto text-lg font-bold mb-6">뉴스 클리핑</h2>
      {isMobile ? (
        // 모바일 레이아웃
        <div className="sm:hidden">
          {contents[0] && (
            <div className="w-full overflow-hidden mb-4 cursor-pointer" onClick={() => router.push(`/learning/detail/${contents[0].articleId}`)}>
              <Image
                src={contents[0].img_link || defaultImage}
                alt={contents[0].title}
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="bg-white w-[90%] sm:w-[100%] mx-auto pt-4">
                <h3 className="text-lg font-bold">{contents[0].title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {contents[0].description}
                </p>
                <div className="w-full justify-between">
                  <span
                    className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-200"
                    style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                  >
                    {contents[0].type || '카테고리'}
                  </span>
                  <div>{contents[0].date}</div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {contents.slice(1, 5).map((content, index) => (
              <div key={index} className="flex gap-4 w-[90%] sm:w-[100%] mx-auto cursor-pointer" onClick={() => router.push(`/learning/detail/${content.articleId}`)}>
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={content.img_link || defaultImage}
                    alt={content.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-sm font-bold line-clamp-1">{content.title}</h3>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {content.description}
                  </p>
                  <div className="w-full justify-between">
                    <span
                      className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-200"
                      style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                    >
                      {content.type || '카테고리'}
                    </span>
                    <div>{content.date}</div>
                  </div>
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
        // 데스크톱 레이아웃
        <div className="hidden sm:flex gap-6">
          {contents[0] && (
            <div className="flex-1 shadow-sm overflow-hidden rounded-lg border cursor-pointer" onClick={() => router.push(`/learning/detail/${contents[0].articleId}`)}>
              <div className="bg-gray-200 rounded-t-lg overflow-hidden">
                <Image
                  src={contents[0].img_link || defaultImage}
                  alt={contents[0].title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-6 h-full flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2">{contents[0].title}</h3>
                <p className="text-gray-600 text-sm">{contents[0].description}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-6 w-1/2">
            {contents.slice(1, 5).map((content, index) => (
              <div key={index} className="flex items-stretch gap-4 cursor-pointer" onClick={() => router.push(`/learning/detail/${content.articleId}`)}>
                <div className="w-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={content.img_link || defaultImage}
                    alt={content.title}
                    width={160}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <span
                    className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-200"
                    style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                  >
                    {content.type || '카테고리'}
                  </span>
                  <h3 className="text-md font-bold line-clamp-2">{content.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {content.description}
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