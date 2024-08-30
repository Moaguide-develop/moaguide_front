import type { MainNews } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const IssueItem = ({ id, title, category, link, date }: MainNews) => {
  return (
    <Link href={link} target="_blank">
      <div className="flex flex-col gap-4 cursor-pointer">
        <div>
          <img
            src={'/images/home/mock.jpeg'}
            alt=""
            className="w-[336px] h-[186px] rounded-[12px]"
          />
        </div>
        <div className="text-title2 text-gray600 max-w-[313px] w-full">{title}</div>
        <div className="flex items-center justify-between ">
          <div className="text-body7 text-gray400"> {formatCategory(category)}</div>
          <div className="text-body7 text-gray300">
            {format(parseISO(date), 'yyyy.MM.dd')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IssueItem;
