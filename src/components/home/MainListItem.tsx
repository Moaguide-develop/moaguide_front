import React from 'react';

interface MainListItemProps {
  category: string;
  platfrom: string;
  name: string;
  price: number;
  priceRate: number;
  lastDivide_rate: number;
  img: string;
}

const MainListItem = ({
  category,
  platfrom,
  name,
  price,
  priceRate,
  lastDivide_rate,
  img
}: MainListItemProps) => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 cursor-pointer">
      <div className="flex gap-5">
        {/* 이미지 */}
        <div>
          <img src={img} alt="" className="w-[82px] h-[82px] rounded-[8px]" />
        </div>
        {/* 메인정보 */}
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex items-center gap-2">
            <div className="text-caption3 text-gray400 p-[6px] bg-bg rounded-[4px] flex items-center justify-center">
              {category}
            </div>
            <div className="text-body7 text-gray300 ">{platfrom}</div>
          </div>
          <div className="text-body1">{name}</div>
          <div className="flex items-center gap-[6px]">
            <div className="text-body7 text-gray400">{price.toLocaleString()}원</div>
            <div className="text-error">
              {'('}
              {'+'} {priceRate}%{')'}
            </div>
          </div>
        </div>
        {/* 부가정보 */}
        <div className="flex items-center gap-4">
          <div className="p-[6px] bg-error bg-opacity-10 text-error text-body7 rounded-[4px]">
            {lastDivide_rate}%
          </div>
          <div className="cursor-pointer">
            <img src="/images/home/bookmark.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainListItem;
