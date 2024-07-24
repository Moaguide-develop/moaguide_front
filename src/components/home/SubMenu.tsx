import React from "react";

const SubMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
        <div className=" text-body5 text-gray700 desk2:text-title2">
          최신 이슈
        </div>
        <div>
          <img
            src="/images/home/phone.svg"
            alt="phone"
            className="w-10 desk2:w-full"
          />
        </div>
      </div>
      <div className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
        <div className=" text-caption1 text-gray700 desk2:text-title2">
          조각투자 상품
        </div>
        <div>
          <img
            src="/images/home/box.svg"
            alt="box"
            className="w-10 desk2:w-full"
          />
        </div>
      </div>
      <div className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
        <div className=" text-body5 text-gray700 desk2:text-title2">리포트</div>
        <div>
          <img
            src="/images/home/paper.svg"
            alt="paper"
            className="w-10 desk2:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
