import React from 'react';

interface CategoryReportItemType {
  category: string;
  title: string;
  date: string;
  img: string;
}

const CategoryReportItem = ({ category, title, date, img }: CategoryReportItemType) => {
  return (
    <div className="py-5 border-b border-gray100 flex gap-5 items-center cursor-pointer">
      <div className="flex-1 flex flex-col gap-3">
        <div className="max-w-max p-[6px] flex items-center justify-center rounded-[4px] bg-gray50 text-gray400 text-caption3">
          {category}
        </div>
        <div className="text-gray600 text-title1">{title}</div>
        <div className="text-gray300 text-body7">{date}</div>
      </div>
      <div>
        <img src={img} alt="" className="w-[132px] h-[93px] rounded-[8px] " />
      </div>
    </div>
  );
};

export default CategoryReportItem;
