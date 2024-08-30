import NoticeItemSkeleton from '@/components/skeleton/NoticeItemSkeleton';
import UseNoticeLists from '@/factory/useNoticeLists';
import { INoticeItem } from '@/types/ProductType';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

const Notice = () => {
  const category = 'sou.8';

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    UseNoticeLists(category);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);

  // const allPosts = data?.pages?.flat() || [];
  const allPosts = data?.pages.flatMap((page) => page.notice) || [];
  // const allPosts = data?.pages[0].notice;
  console.log(allPosts);

  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => <NoticeItemSkeleton key={i} />)
      ) : (
        <Virtuoso
          style={{ height: '200px', margin: '0px' }}
          useWindowScroll
          totalCount={allPosts.length}
          data={allPosts}
          endReached={loadMore}
          itemContent={(index, item: INoticeItem) => (
            <NoticeItem key={item.id} {...item} />
          )}
        />
      )}
    </div>
  );
};

export default Notice;

const NoticeItem = ({ content, id, noticeDay, title }: INoticeItem) => {
  return (
    <div
      key={id}
      className=" flex flex-col border-b-[1px] border-gray-200 py-[20px] px-[20px] rounded-lg">
      <div className="text-base font-bold mb-[12px]">{title}</div>
      <div className="text-gray-400">{noticeDay}</div>
    </div>
  );
};
