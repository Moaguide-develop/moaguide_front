'use client';
import Container from '@/components/common/Container';
import NoticeItemSkeleton from '@/components/skeleton/NoticeItemSkeleton';
import UseNoticeLists from '@/factory/useNoticeLists';
import { INoticeItem } from '@/types/BuildingProductType';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const NoticePage = () => {
  const router = useRouter();
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

  return (
    <div className='min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] sm:mb-0 w-[90%] mx-auto sm:max-w-[640px]'>
      <Image
        src={'/images/detail/CaretLeft.svg'}
        width={24}
        height={24}
        alt="Left Arrow"
        className="py-[14px]"
        onClick={() => router.back()}
        placeholder="blur"
        priority
        blurDataURL="/detail/CaretLeft.svg"
      />
      <div>
        <div className="text-heading3 mt-3">
          공지사항
        </div>

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
      </div>
    </div>
  );
};

export default NoticePage;

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
