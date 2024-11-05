import type { MainReportType } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import React from 'react';
import Image from 'next/image';
const MainReportItem = ({ category, title, date, link, description, imageLink }: MainReportType) => {

  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="py-4 border-b border-gray100 flex items-center gap-5 cursor-pointer"  onClick={handleClick}>
      {/* 왼쪽 */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="text-mobileTitle sm:text-title2 text-gray600">{title}</div>
        <div className='text-gray300 text-caption3 sm:text-body7 line-clamp-3 flex-grow'>{description}</div>
        <div className="text-body7 text-gray300">
          {format(parseISO(date), 'yyyy.MM.dd')}
        </div>
      </div>
      {/* 오른쪽 */}
      <div className='h-full'>
        <Image
          src={imageLink}
          alt="img"
          width={90}
          height={75}
          className="w-[90px] h-[75px] sm:w-[132px] sm:h-[93px] rounded-[8px] mb-auto"
        />
      </div>
    </div>
  );
};

export default MainReportItem;
