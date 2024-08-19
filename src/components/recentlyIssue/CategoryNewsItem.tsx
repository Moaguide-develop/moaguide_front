import { IssueListItem } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const CategoryNewsItem = ({ id, title, category, link, date }: IssueListItem) => {
  return (
    <Link href={link} target="_blank">
      <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 items-center cursor-pointer">
        <div>
          <img
            src={'/images/home/mock.jpeg'}
            alt=""
            className="w-[132px] h-[93px] rounded-[12px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-title2 text-gray600">{title}</div>
          <div className="flex items-center justify-between">
            <div className="text-body7 text-gray400">{formatCategory(category)}</div>
            <div className="text-body7 text-gray300">
              {' '}
              {format(parseISO(date), 'yyyy.MM.dd')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryNewsItem;
