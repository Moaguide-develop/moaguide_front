import type { MainNews } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react';
import { CountupNewsView } from '@/factory/ViewCount'; 

const IssueItem = ({ id, title, category, link, imgUrl, date }: MainNews) => {
  const [objectPosition, setObjectPosition] = useState<'top' | 'center'>('center');
  const viewMutation = CountupNewsView();

  // 이미지 로드 후 가로 세로 비율을 감지하는 함수
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth; // 세로로 긴지 확인
    setObjectPosition(isPortrait ? 'top' : 'center'); // 세로로 긴 이미지는 상단, 가로로 긴 이미지는 중앙
  };

  const handleClick = () => {
    viewMutation.mutate({ productId: id.toString() }); 
    window.open(link, '_blank'); 
  };

  return (
    <div onClick={handleClick} className="flex flex-col gap-4 cursor-pointer w-full h-full">
      <div className="relative w-full" style={{ paddingTop: '55.36%' }}>
        <img
          src={imgUrl}
          alt="Image"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectPosition: objectPosition, // 가로 세로 비율에 따라 object-position 설정
            objectFit: 'cover',
          }}
          srcSet={`
            ${imgUrl}?w=300 300w,
            ${imgUrl}?w=600 600w,
            ${imgUrl}?w=1200 1200w
          `}
          onLoad={handleImageLoad} // 이미지 로드 후 비율 감지
        />
      </div>
      <div className="text-mobileTitle sm:text-title2 text-gray600">
        {title}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="text-caption3 sm:text-body7 text-gray400">
          {formatCategory(category)}
        </div>
        <div className="text-caption3 sm:text-body7 text-gray300">
          {format(parseISO(date), 'yyyy.MM.dd')}
        </div>
      </div>
    </div>
  );
};

export default IssueItem;