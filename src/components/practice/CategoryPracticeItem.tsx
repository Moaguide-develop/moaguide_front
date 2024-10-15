import type { StudyGuidesItem, SubLoadmap } from '@/types/homeComponentsType';
import React from 'react';

const CategoryPracticeItem = ({ id, title, link }: StudyGuidesItem) => {

  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className='pb-5'>
      <div className="flex gap-5 items-center cursor-pointer rounded-xl shadow border border-[#eceef2] px-5 py-6" onClick={handleClick}>
        <div className="flex-1 flex">
          <div className="text-gray600 text-body5 sm:text-title1">{title}</div>
        </div>
        <div className='text-[#bdbdbd] text-sm font-bold'>더보기</div>
        <img
          src={'images/report/left-button.svg'}
          alt="Toggle Details"
          className="w-[30px] h-[30px]"
        />
      </div>
      <div>
      </div>
    </div>
  );
};

export default CategoryPracticeItem;