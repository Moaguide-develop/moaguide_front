import { useRouter } from 'next/navigation';
import React from 'react';

const SubMenu = () => {
  const router = useRouter();

  return (
    <div>
      {/* 데스크톱 */}
      <div className="items-center gap-3 hidden sm:flex">
        <div
          onClick={() => {
            router.push('/newissue');
          }}
          className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-body5 text-gray700 desk2:text-title2">최신 이슈</div>
          <div>
            <img src="/images/home/phone.svg" alt="phone" className="w-10 desk2:w-full" />
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-caption1 text-gray700 desk2:text-title2">
            조각투자 상품
          </div>
          <div>
            <img src="/images/home/box.svg" alt="box" className="w-10 desk2:w-full" />
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/reportpage');
          }}
          className="cursor-pointer flex-1 flex items-center justify-between px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-body5 text-gray700 desk2:text-title2">리포트</div>
          <div>
            <img src="/images/home/paper.svg" alt="paper" className="w-10 desk2:w-full" />
          </div>
        </div>
      </div>
      {/* 모바일 */}
      <div className="sm:hidden flex justify-center gap-[12px]">
        <div
          onClick={() => {
            router.push('/newissue');
          }}
          className="max-w-[110px] w-full px-[27px] py-4 flex flex-col justify-center items-center gap-3   rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/phone.svg" alt="phone" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700">최신이슈</div>
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className="max-w-[110px] w-full px-[16px] py-4 flex flex-col justify-center items-center gap-3  rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/box.svg" alt="box" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700"> 조각투자 상품</div>
        </div>
        <div
          onClick={() => {
            router.push('/reportpage');
          }}
          className="max-w-[110px] w-full px-[27px] py-4 flex flex-col justify-center items-center gap-3  rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/paper.svg" alt="paper" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700">리포트</div>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
