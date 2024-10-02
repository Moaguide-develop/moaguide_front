import React from 'react';
import { InvestmentGuideProps } from '@/types/homeComponentsType';
import Image from 'next/image';

const CategorySubloadmapBottomArticle: React.FC<InvestmentGuideProps> = ({ id, title, description, date, imageLink, link }) => {

  const handleClick = () => {
    console.log(link);
    window.open(link, '_blank');
  };

  return (
    <div className='w-full pt-5' onClick={handleClick}> 
      <div className="flex gap-5 items-center cursor-pointer">
        <Image
          src={imageLink} 
          alt={title}
          width={70}
          height={70}
          className="w-[70px] h-[70px] rounded-lg"
        />
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-gray600 text-body5 sm:text-title1">{title}</div>
          <div className="text-gray300 text-caption3 sm:text-body7">{description}ㆍ{date}</div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubloadmapBottomArticle;