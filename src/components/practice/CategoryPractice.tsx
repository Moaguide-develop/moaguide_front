import React, { useCallback, useState, useEffect } from 'react';
import { useReportStore } from '@/store/report.store';
import { Virtuoso } from 'react-virtuoso';
import { getStudyGuides, getArticles } from '@/factory/ReportLists';
import CategoryPracticeItem from './CategoryPracticeItem';
import CategoryPracticeItemSkeleton from '../skeleton/CategoryPracticeItemSkeleton';
import SubLoadmapBottomArticleSkeleton from '../skeleton/SubLoadmapBottomArticleSkeleton';
import CategorySubloadmapBottomArticle from './CategorySubloadmapBottomArticle';

const CategoryPractice = () => {
  const { currentCategory, subCategory, sort, setSubCategory } = useReportStore();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [guideLoaded, setGuideLoaded] = useState(false);  
  const [articleLoaded, setArticleLoaded] = useState(false);  

  const {
    data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading
  } = subCategory === 'guide' 
      ? getStudyGuides(currentCategory, subCategory, sort) 
      : getArticles(); 

  useEffect(() => {
    if (subCategory === 'guide' && !guideLoaded && isLoading) {
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        setGuideLoaded(true);  
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (subCategory === 'article' && !articleLoaded && isLoading) {
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        setArticleLoaded(true); 
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (!isLoading) {
      setShowSkeleton(false);
    }
  }, [subCategory, guideLoaded, articleLoaded, isLoading]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 500);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);

  const allPosts = data || [];

  return (
    <div className="mt-5 sm:mt-0">
      <div className="flex items-center gap-5 border-b border-gray100 text-body5 sm:text-title2 mb-5">
        <div 
          onClick={() => setSubCategory('guide')} 
          className={`pb-4 cursor-pointer ${subCategory === 'guide' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}
        >
          조각투자 가이드
        </div>
        <div 
          onClick={() => setSubCategory('article')} 
          className={`pb-4 cursor-pointer ${subCategory === 'article' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}
        >
          재테크 가이드
        </div>
      </div>

      <div>
        {showSkeleton && isLoading ? (
          subCategory === 'guide' ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-item">
                <CategoryPracticeItemSkeleton />
              </div>
            ))
          ) : (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton-item">
                <SubLoadmapBottomArticleSkeleton />
              </div>
            ))
          )
        ) : (
          <Virtuoso
          style={{ minHeight: '200px', height: '100vh', margin: '0px' }}
          useWindowScroll
          totalCount={allPosts.length}
          data={allPosts}
          endReached={loadMore}
          itemContent={(index, item) => {
            if (!item) {
              // Zero-sized element 에러 해결 방법: 아이템이 없을 경우 1px 높이 적용
              return <div style={{ height: '1px', overflow: 'hidden' }}></div>;
            }
        
            if (subCategory === 'guide') {
              return <CategoryPracticeItem key={item.id} {...item} />;
            } else {
              const firstItem = allPosts[index * 2];
              const secondItem = allPosts[index * 2 + 1];
        
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8 w-full">
                  {firstItem ? (
                    <CategorySubloadmapBottomArticle
                      key={firstItem.id}
                      id={firstItem.id}
                      title={firstItem.title}
                      description={firstItem.description}
                      imageLink={firstItem.imageLink}
                      date={firstItem.date}
                      link={firstItem.link}
                    />
                  ) : <div style={{ height: '1px', overflow: 'hidden' }}></div>}
                  {secondItem ? (
                    <CategorySubloadmapBottomArticle
                      key={secondItem.id}
                      id={secondItem.id}
                      title={secondItem.title}
                      description={secondItem.description}
                      imageLink={secondItem.imageLink}
                      date={secondItem.date}
                      link={secondItem.link}
                    />
                  ) : <div style={{ height: '1px', overflow: 'hidden' }}></div>}
                </div>
              );
            }
          }}
        />
        )}
      </div>
    </div>
  );
};

export default CategoryPractice;