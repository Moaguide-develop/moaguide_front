import React from 'react';

interface IssueItemType {
  news: string;
  title: string;
  date: string;
  img: string;
  rank: number;
}

const BestNewsItem = ({ news, title, date, img, rank }: IssueItemType) => {
  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      <div className="relative">
        <img src={img} alt="" className="w-[336px] h-[186px] rounded-[12px]" />
      </div>
      <img
        src={`/images/home/issue_rank${rank}.svg`}
        alt=""
        className="absolute mt-1 ml-1"
      />
      <div className="text-title2 text-gray600 max-w-[313px] w-full">{title}</div>
      <div className="flex items-center justify-between ">
        <div className="text-body7 text-gray400">{news}</div>
        <div className="text-body7 text-gray300">{date}</div>
      </div>
    </div>
  );
};

export default BestNewsItem;
