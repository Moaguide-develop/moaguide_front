import type { ReportListsItem } from '@/types/homeComponentsType';

import React, { useCallback } from 'react';
import CategoryReportItem from './CategoryReportItem';
import { useReportStore } from '@/store/report.store';
import { getReportLists } from '@/factory/ReportLists';
import { Virtuoso } from 'react-virtuoso';
import CategoryReportItemSkeleton from '../skeleton/CategoryReportItemSkeleton';

const CategoryReport = () => {
  const { currentCategory, subCategory, sort, setSubCategory, setSort } =
    useReportStore();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    getReportLists(currentCategory, subCategory, sort);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 500);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);

  const allPosts = data || [];

  return (
    <div className="mt-0 sm:mt-5">
      <div className="mt-6 sm:mt-8 flex items-center gap-5 border-b border-gray100 text-body5 sm:text-title2">
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
        <div className="text-body5 sm:text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('latest');
            }}
            className={`flex items-center gap-1 px-[6px] sm:px-[10px] py-1 sm:py-2 rounded-[100px] text-caption1 sm:text-body6 cursor-pointer
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
            className={`flex items-center gap-1 px-[6px] sm:px-[10px] py-1 sm:py-2 rounded-[100px] text-caption1 sm:text-body6 cursor-pointer
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <CategoryReportItemSkeleton key={i} />)
        ) : (
          <Virtuoso
            style={{ height: 'calc(100vh - 50px)', margin: '0px' }}
            useWindowScroll
            totalCount={allPosts.length}
            data={allPosts}
            endReached={loadMore}
            itemContent={(index, item: ReportListsItem) => (
              <CategoryReportItem key={item.id} {...item} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryReport;
