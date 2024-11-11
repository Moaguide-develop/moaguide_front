import Image from 'next/image';
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
          className="cursor-pointer flex-1 flex items-center justify-between px-[16px] md:px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-body5 text-gray700 desk2:text-title2">최신 이슈</div>
          <div>
            <img src="/images/home/phone.svg" alt="phone" className="w-10 desk2:w-full" />
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className="cursor-pointer flex-1 flex items-center justify-between px-[16px] md:px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-caption1 text-gray700 desk2:text-title2">
            조각투자 상품
          </div>
          <div>
            <img src="/images/home/box.svg" alt="box" className="w-10 desk2:w-full" />
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/practicepage');
          }}
          className="cursor-pointer flex-1 flex items-center justify-between px-[16px] md:px-[28px] py-[22px] rounded-[12px] bg-bg">
          <div className=" text-body5 text-gray700 desk2:text-title2">학습하기</div>
          <div>
            <img src="/images/home/paper.svg" alt="paper" className="w-10 desk2:w-full" />
          </div>
        </div>

        <div
          className="w-[260px] h-[95px] pl-2  bg-[#6e35e8] rounded-[27.10px] gap-[10px] flex
        items-center desk:hidden md:flex cursor-pointer
        "
          onClick={() => {
            router.push('/quiz/start');
          }}>
          <Image src="/images/quiz/Test.svg" alt="arrow" width={62} height={67} />
          <div className="flex flex-col ">
            <div className=" text-white text-lg">내 경제지식은 몇등?</div>
            <div className="flex">
              <div className=" text-white text-lg mr-3">시험보러 가기</div>

              <Image
                src="/images/quiz/RightArrow.svg"
                alt="arrow"
                width={30}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 모바일 */}
      <div className="sm:hidden flex justify-center gap-[12px]">
        <div
          onClick={() => {
            router.push('/newissue');
          }}
          className="max-w-[110px] w-full py-4 flex flex-col justify-center items-center gap-3   rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/phone.svg" alt="phone" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700">최신이슈</div>
        </div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className="max-w-[110px] w-full py-4 flex flex-col justify-center items-center gap-3  rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/box.svg" alt="box" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700"> 조각투자 상품</div>
        </div>
        <div
          onClick={() => {
            router.push('/practicepage');
          }}
          className="max-w-[110px] w-full py-4 flex flex-col justify-center items-center gap-3  rounded-[12px] border border-gray100">
          <div>
            <img src="/images/home/paper.svg" alt="paper" className="w-10 desk2:w-full" />
          </div>
          <div className="text-mobileTitle text-gray700">학습하기</div>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
