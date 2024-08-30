import type { MainNews } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

interface BestNewsItemType {
  item: MainNews;
  rank: number;
}

const BestNewsItem = ({ item, rank }: BestNewsItemType) => {
  return (
    <Link href={item.link} target="_blank">
      <div className="flex flex-col gap-4 cursor-pointer">
        <div className="relative">
          <img
            src={'/images/home/mock.jpeg'}
            alt=""
            className="w-[336px] h-[186px] rounded-[12px]"
          />
        </div>
        <img
          src={`/images/home/issue_rank${rank}.svg`}
          alt=""
          className="absolute mt-1 ml-1"
        />
        <div className="text-title2 text-gray600 max-w-[313px] w-full">{item.title}</div>
        <div className="flex items-center justify-between ">
          <div className="text-body7 text-gray400">{formatCategory(item.category)}</div>
          <div className="text-body7 text-gray300">
            {' '}
            {format(parseISO(item.date), 'yyyy.MM.dd')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestNewsItem;
