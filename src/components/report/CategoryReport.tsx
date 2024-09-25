import React, { useCallback } from 'react';
import CategoryReportItem from './CategoryReportItem'; // 필요에 따라 조정
import { useReportStore } from '@/store/report.store';
import { Virtuoso } from 'react-virtuoso';
import CategoryReportItemSkeleton from '../skeleton/CategoryReportItemSkeleton';
import { getStudyGuides } from '@/factory/ReportLists';

const CategoryReport = () => {
  const { currentCategory, subCategory, sort, setSubCategory, setSort } = useReportStore();

  // 변경된 데이터 페칭 함수 사용
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } = getStudyGuides();

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
        <div onClick={() => setSubCategory('guide')} className={`pb-5 cursor-pointer ${subCategory === 'guide' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>투자 가이드</div>
        <div onClick={() => setSubCategory('analyze')} className={`pb-5 cursor-pointer ${subCategory === 'analyze' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>상품분석</div>
        <div onClick={() => setSubCategory('situation')} className={`pb-5 cursor-pointer ${subCategory === 'situation' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>시황&전망</div>
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
            itemContent={(index, item) => (
              <CategoryReportItem key={item.id} {...item} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryReport;