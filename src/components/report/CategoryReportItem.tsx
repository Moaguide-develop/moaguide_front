import type { ReportListsItem } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';

const CategoryReportItem = ({ id, title, category, date }: ReportListsItem) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/report/${id}`)}
      className="py-5 border-b border-gray100 flex gap-5 items-center cursor-pointer">
      <div className="flex-1 flex flex-col gap-3">
        <div className="max-w-max p-1 sm:p-[6px] flex items-center justify-center rounded-[4px] bg-gray50 text-gray400 text-caption3">
          {formatCategory(category)}
        </div>
        <div className="text-gray600 text-body5 sm:text-title1">{title}</div>
        <div className="text-gray300 text-caption3 sm:text-body7">
          {' '}
          {format(parseISO(date), 'yyyy.MM.dd')}
        </div>
      </div>
      <div>
        <img
          src={'/images/home/mock.jpeg'}
          alt=""
          className="w-[132px] h-[93px] rounded-[8px] "
        />
      </div>
    </div>
  );
};

export default CategoryReportItem;
