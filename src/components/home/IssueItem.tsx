import type { MainNews } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const IssueItem = ({ id, title, category, link, imgUrl, date }: MainNews) => {
  return (
    <Link href={link} target="_blank">
      <div className="flex flex-col gap-4 cursor-pointer w-full h-full">
        <div className="relative w-full" style={{ paddingTop: '55.36%' }}>
          <img
            src={imgUrl}
            alt="Image"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
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
    </Link>
  );
};

export default IssueItem;