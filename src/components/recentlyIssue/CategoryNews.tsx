import type { IssueListItem } from '@/types/homeComponentsType';

import React, { useCallback, useState } from 'react';
import CategoryNewsItem from './CategoryNewsItem';
import { getIssueLists } from '@/factory/IssueLists';
import CategoryNewsItemSkeleton from '../skeleton/CategoryNewsItemSkeleton';
import { Virtuoso } from 'react-virtuoso';

const CategoryNews = () => {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('latest');

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    getIssueLists(category, sort);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 500);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);

  const allPosts = data || [];

  return (
    <div className="mt-5">
      <div className="mt-8 flex items-center gap-5 border-b border-gray100 text-title2">
        <div
          onClick={() => {
            setCategory('all');
          }}
          className={`pb-5 cursor-pointer ${category === 'all' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          전체
        </div>
        <div
          onClick={() => {
            setCategory('building');
          }}
          className={`pb-5 cursor-pointer ${category === 'building' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          부동산
        </div>
        <div
          onClick={() => {
            setCategory('music');
          }}
          className={`pb-5 cursor-pointer ${category === 'music' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          음악저작권
        </div>
        <div
          onClick={() => {
            setCategory('cow');
          }}
          className={`pb-5 cursor-pointer ${category === 'cow' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          한우
        </div>
        <div
          onClick={() => {
            setCategory('art');
          }}
          className={`pb-5 cursor-pointer ${category === 'art' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          미술품
        </div>
        <div
          onClick={() => {
            setCategory('content');
          }}
          className={`pb-5 cursor-pointer ${category === 'content' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          콘텐츠
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

      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => <CategoryNewsItemSkeleton key={i} />)
      ) : (
        <Virtuoso
          style={{ height: 'calc(100vh - 50px)', margin: '0px' }}
          useWindowScroll
          totalCount={allPosts.length}
          data={allPosts}
          endReached={loadMore}
          itemContent={(index, item: IssueListItem) => (
            <CategoryNewsItem key={item.id} {...item} />
          )}
        />
      )}
    </div>
  );
};

export default CategoryNews;
