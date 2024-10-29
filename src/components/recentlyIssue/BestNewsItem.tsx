import type { MainNews } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react';
import { CountupNewsView } from '@/factory/ViewCount';

interface BestNewsItemType {
  item: MainNews;
  rank: number;
}

const BestNewsItem = ({ item, rank }: BestNewsItemType) => {
  const defaultImages: { [key: string]: string } = {
    building: 'images/home/default-real-estate.png',
    music: 'images/home/default-entertainment.png',
    cow: 'images/home/default-cow.png',
    art: 'images/home/default-art.png', 
    content: 'images/home/default-art.png',
  };

  const imageSrc = 
    (!item.imgUrl || item.imgUrl === 'No image' || item.imgUrl === 'null' || item.imgUrl.startsWith('http://')) 
      ? defaultImages[item.category] 
      : item.imgUrl;

  const [objectPosition, setObjectPosition] = useState<'top' | 'center'>('center');
  const viewMutation = CountupNewsView();

  const handleClick = () => {
    viewMutation.mutate({ productId: item.id.toString() });
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setObjectPosition(isPortrait ? 'top' : 'center');
  };

  return (
    <Link href={item.link} target="_blank" onClick={handleClick}>
      <div className="flex flex-col gap-4 cursor-pointer mt-5 sm:mt-0 h-full">
        <div className="relative w-full" style={{ paddingTop: '55.36%' }}>
          <img
            src={imageSrc}
            alt="Image"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectPosition: objectPosition,
              objectFit: 'cover',
            }}
            srcSet={`
              ${imageSrc}?w=300 300w,
              ${imageSrc}?w=600 600w,
              ${imageSrc}?w=1200 1200w
            `}
            onLoad={handleImageLoad}
          />
          <img
            src={`/images/home/issue_rank${rank}.svg`}
            alt=""
            className="absolute mt-1 ml-1"
          />
        </div>
        <div className="flex-1 sm:text-title2 text-title1 text-gray600 w-full">
          {item.title}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-body4 sm:text-body7 text-gray400">
            {formatCategory(item.category)}
          </div>
          <div className="text-body4 sm:text-body7 text-gray300">
            {format(parseISO(item.date), 'yyyy.MM.dd')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestNewsItem;