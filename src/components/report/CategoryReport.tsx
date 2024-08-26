import React from 'react';
import CategoryReportItem from './CategoryReportItem';
import { useReportStore } from '@/store/report.store';

const CategoryReport = () => {
  const { subCategory, sort, setSubCategory, setSort } = useReportStore();

  return (
    <div className="mt-5">
      <div className="mt-8 flex items-center gap-5 border-b border-gray100 text-title2">
        <div
          onClick={() => {
            setSubCategory('guide');
          }}
          className={`pb-5 cursor-pointer ${subCategory === 'guide' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          투자 가이드
        </div>
        <div
          onClick={() => {
            setSubCategory('analyze');
          }}
          className={`pb-5 cursor-pointer ${subCategory === 'analyze' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          상품분석
        </div>
        <div
          onClick={() => {
            setSubCategory('situation');
          }}
          className={`pb-5 cursor-pointer ${subCategory === 'situation' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          시황&전망
        </div>
      </div>
      <div className="py-[10px] flex items-center gap-[10px] border-b border-gray100">
        <div className="text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('latest');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'latest' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}
            `}>
            최신순
            <img
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'latest' ? 'block' : 'hidden'}`}
            />
          </div>
          <div
            onClick={() => {
              setSort('popular');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'popular' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}
            `}>
            인기순
            <img
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'popular' ? 'block' : 'hidden'}`}
            />
          </div>
        </div>
      </div>
      <div>
        {/* {mock.map((item, i) => (
          <CategoryReportItem key={i} {...item} />
        ))} */}
      </div>
    </div>
  );
};

export default CategoryReport;
