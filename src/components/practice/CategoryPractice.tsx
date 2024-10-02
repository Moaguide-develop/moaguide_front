import React, { useCallback } from 'react';
import { useReportStore } from '@/store/report.store';
import { Virtuoso } from 'react-virtuoso';
import { getStudyGuides, getArticles } from '@/factory/ReportLists';
import CategoryPracticeItem from './CategoryPracticeItem';
import CategoryPracticeItemSkeleton from '../skeleton/CategoryPracticeItemSkeleton';
import SubLoadmapBottomArticleSkeleton from '../skeleton/SubLoadmapBottomArticleSkeleton';
import CategorySubloadmapBottomArticle from './CategorySubloadmapBottomArticle'; 

const CategoryPractice = () => {
  const { currentCategory, subCategory, sort, setSubCategory } = useReportStore();

  const {
    data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading
  } = subCategory === 'guide' 
      ? getStudyGuides(currentCategory, subCategory, sort) 
      : getArticles(); 

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
          onClick={() => setSubCategory('guide')} 
          className={`pb-5 cursor-pointer ${subCategory === 'guide' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}
        >
          조각투자 가이드
        </div>
        <div 
          onClick={() => setSubCategory('article')} 
          className={`pb-5 cursor-pointer ${subCategory === 'article' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}
        >
          재테크 가이드
        </div>
      </div>

      <div>
        {isLoading ? (
          subCategory === 'guide' ? (
            Array.from({ length: 10 }).map((_, i) => <CategoryPracticeItemSkeleton key={i} />) 
          ) : (
            Array.from({ length: 10 }).map((_, i) => <SubLoadmapBottomArticleSkeleton key={i} />)
          )
        ) : (
          <Virtuoso
            style={{ height: 'calc(100vh - 50px)', margin: '0px' }}
            useWindowScroll
            totalCount={allPosts.length}
            data={allPosts}
            endReached={loadMore}
            itemContent={(_index, item) => (
              subCategory === 'guide' ? (
                <CategoryPracticeItem key={item.id} {...item} />
              ) : (
                <CategorySubloadmapBottomArticle key={item.id} data={item} isTop={false} isBottom={false} />
              )
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPractice;