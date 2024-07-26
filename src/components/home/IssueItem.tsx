import React from 'react';

interface IssueItemType {
  news: string;
  title: string;
  date: string;
  img: string;
}

const IssueItem = ({ news, title, date, img }: IssueItemType) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <img src={img} alt="" className="w-[336px] h-[186px] rounded-[12px]" />
      </div>
      <div className="text-title2 text-gray600 max-w-[313px] w-full">{title}</div>
      <div className="flex items-center justify-between ">
        <div className="text-body7 text-gray400">{news}</div>
        <div className="text-body7 text-gray300">{date}</div>
      </div>
    </div>
  );
};

export default IssueItem;
