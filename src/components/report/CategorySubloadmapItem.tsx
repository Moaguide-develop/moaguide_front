import { CategorySubloadmapItemProps } from '@/types/homeComponentsType';
import React, { useState } from 'react';

const CategorySubloadmapItem: React.FC<CategorySubloadmapItemProps> = ({ data, isTop, isBottom }) => {

  const [toggleImage, setToggleImage] = useState('/images/report/toggle_button.svg');

  return (
    <div className={`flex gap-5 items-center cursor-pointer ${isTop ? 'border-t border-black pt-8 mt-8' : ''} ${isBottom ? 'pb-6' : 'pb-4'}`}>
      <div className='flex-1 flex flex-col gap-3'>
        <div className="text-gray600 text-body5 sm:text-title1">{`${data.number}. ${data.title}`}</div>
        <div className="text-gray300 text-caption3 sm:text-body7">{data.description}</div>
      </div>
      <img src={toggleImage} alt="Toggle Details" className="w-[30px] h-[30px]" />
    </div>
  );
};
  
  export default CategorySubloadmapItem;