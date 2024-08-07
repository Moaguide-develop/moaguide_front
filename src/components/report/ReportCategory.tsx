import { useReportStore } from '@/store/report.store';
import Image from 'next/image';
import React from 'react';

const ReportCategory = () => {
  const { currentCategory, setCurrentCategory } = useReportStore();
  return (
    <div className="my-[28px]">
      <div className="flex items-center gap-20">
        {/* 전체 */}
        <div
          onClick={() => setCurrentCategory('all')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 border bg-gray50  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'all' ? 'border-[#713CE2] text-[#713CE2]' : 'text-gray500 border-gray100'}
             `}>
            ALL
          </div>
          <div
            className={`
            ${currentCategory === 'all' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            전체
          </div>
        </div>
        {/* 부동산 */}
        <div
          onClick={() => setCurrentCategory('building')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 bg-gray50 text-[#713CE2] border  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'building' ? 'border-[#713CE2]' : 'border-gray100'}
             `}>
            <img src="/images/report/building.svg" alt="building" />
          </div>
          <div
            className={` 
          ${currentCategory === 'building' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            부동산
          </div>
        </div>
        {/* 음악 */}
        <div
          onClick={() => setCurrentCategory('music')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 bg-gray50 text-[#713CE2] border  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'music' ? 'border-[#713CE2]' : 'border-gray100'}
             `}>
            <img src="/images/report/music.svg" alt="music" />
          </div>
          <div
            className={` 
          ${currentCategory === 'music' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            음악 저작권
          </div>
        </div>
        {/* 한우 */}
        <div
          onClick={() => setCurrentCategory('cow')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 bg-gray50 text-[#713CE2] border  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'cow' ? 'border-[#713CE2]' : 'border-gray100'}
             `}>
            <img src="/images/report/cow.svg" alt="cow" />
          </div>
          <div
            className={` 
          ${currentCategory === 'cow' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            한우
          </div>
        </div>
        {/* 미술 */}
        <div
          onClick={() => setCurrentCategory('art')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 bg-gray50 text-[#713CE2] border  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'art' ? 'border-[#713CE2]' : 'border-gray100'}
             `}>
            <img src="/images/report/picture.svg" alt="art" />
          </div>
          <div
            className={` 
          ${currentCategory === 'art' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            미술
          </div>
        </div>
        {/* 콘텐츠 */}
        <div
          onClick={() => setCurrentCategory('contents')}
          className="flex flex-col gap-2 items-center cursor-pointer">
          <div
            className={`text-body5 bg-gray50 text-[#713CE2] border  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] 
            ${currentCategory === 'contents' ? 'border-[#713CE2]' : 'border-gray100'}
             `}>
            <img src="/images/report/movie.svg" alt="contents" />
          </div>
          <div
            className={` 
          ${currentCategory === 'contents' ? 'text-[#713CE2] text-body5' : 'text-gray500 text-body7'}
          `}>
            콘텐츠
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCategory;
