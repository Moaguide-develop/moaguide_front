import React from 'react';
import { InvestmentGuideProps } from '@/types/homeComponentsType';
import Image from 'next/image';

const CategorySubloadmapBottomArticle: React.FC<InvestmentGuideProps> = ({ id, title, description, date, imageLink, link }) => {

  const handleClick = () => {
    console.log(link);
    window.open(link, '_blank');
  };

  const formattedDate = date.split('T')[0];

  return (
    <div className='w-full pt-5' onClick={handleClick}> 
      <div className="flex gap-5 items-center cursor-pointer">
        <Image
          src={imageLink} 
          alt={title}
          width={70}
          height={70}
          className="w-[70px] h-[70px] rounded-lg mb-auto"
        />
        <div className="flex-1 flex flex-col gap-3 h-full">
          <div className="text-gray600 text-body5 sm:text-title1">{title}</div>

          {/* Description with 3-line limit */}
          <div className="text-gray300 text-caption3 sm:text-body7 line-clamp-3 flex-grow">
            {description}
          </div>

          {/* Date with margin-top auto to push it to the bottom */}
          <div className="text-gray300 text-caption3 sm:text-body7 ml-auto mt-auto">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubloadmapBottomArticle;