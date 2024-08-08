import React from 'react';

interface CategoryNewsItemType {
  news: string;
  title: string;
  date: string;
  img: string;
}

const CategoryNewsItem = ({ news, title, date, img }: CategoryNewsItemType) => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 items-center cursor-pointer">
      <div>
        <img src={img} alt="" className="w-[132px] h-[93px] rounded-[12px]" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="text-title2 text-gray600">{title}</div>
        <div className="flex items-center justify-between">
          <div className="text-body7 text-gray400">{news}</div>
          <div className="text-body7 text-gray300">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsItem;
