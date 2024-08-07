import React from 'react';

interface MainReportItemProps {
  category: string;
  title: string;
  date: string;
  img: string;
}

const MainReportItem = ({ category, title, date, img }: MainReportItemProps) => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 cursor-pointer">
      {/* 왼쪽 */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="p-[6px] rounded-[4px] bg-bg text-caption3 text-gray400 max-w-max">
          {category}
        </div>
        <div className="text-title2 text-gray600">{title}</div>
        <div className="text-body7 text-gray300">{date}</div>
      </div>
      {/* 오른쪽 */}
      <div>
        <img src={img} alt="" className="w-[132px] h-[93px] rounded-[8px]" />
      </div>
    </div>
  );
};

export default MainReportItem;
