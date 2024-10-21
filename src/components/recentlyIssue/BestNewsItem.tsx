import type { MainNews } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface BestNewsItemType {
  item: MainNews;
  rank: number;
}

const BestNewsItem = ({ item, rank }: BestNewsItemType) => {
  return (
    <Link href={item.link} target="_blank">
      <div className="flex flex-col gap-4 cursor-pointer mt-5 sm:mt-0 h-full">
      <div className="relative w-full" style={{ paddingTop: '55.36%' }}>
        <img
          src={item.imgUrl}
          alt="Image"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          srcSet={`
            ${item.imgUrl}?w=300 300w,
            ${item.imgUrl}?w=600 600w,
            ${item.imgUrl}?w=1200 1200w
          `}
        />
        </div>
        <img
          src={`/images/home/issue_rank${rank}.svg`}
          alt=""
          className="absolute mt-1 ml-1"
        />
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