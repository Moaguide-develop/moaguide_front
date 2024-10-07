import type { MainReportType } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import React from 'react';

const MainReportItem = ({ category, title, date, link, description, imageLink }: MainReportType) => {

  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="mt-5 pb-5 border-b border-gray100 flex items-center gap-5 cursor-pointer"  onClick={handleClick}>
      {/* 왼쪽 */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="p-[6px] rounded-[4px] bg-bg text-caption3 text-gray400 max-w-max">
          {formatCategory(category)}
        </div>
        <div className="text-mobileTitle sm:text-title2 text-gray600">{title}</div>
        <div className='text-gray300 text-caption3 sm:text-body7 line-clamp-3 flex-grow'>{description}</div>
        <div className="text-body7 text-gray300">
          {format(parseISO(date), 'yyyy.MM.dd')}
        </div>
      </div>
      {/* 오른쪽 */}
      <div className='h-full'>
        <img
          src={imageLink}
          alt="img"
          className="w-[90px] h-[75px] sm:w-[132px] sm:h-[93px] rounded-[8px] mb-auto"
        />
      </div>
    </div>
  );
};

export default MainReportItem;
