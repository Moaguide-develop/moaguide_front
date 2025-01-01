import Image from 'next/image';
import { formatDate } from '@/utils/FormatDate';
import UseReportList from '@/factory/useReportList';
import { useCallback } from 'react';
import { IreportItem } from '@/types/Product/BuildingProductType';
import NoticeItemSkeleton from '@/components/skeleton/NoticeItemSkeleton';
import { Virtuoso } from 'react-virtuoso';
const Report = () => {
  const category = 'guide';

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    UseReportList(category);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);

  const allPosts = data?.pages.flatMap((page) => page.report) || [];

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
          itemContent={(index, item: IreportItem) => (
            <ReportItem key={item.id} {...item} />
          )}
        />
      )}
    </div>
  );
};

export default Report;

const ReportItem = ({ content, id, category, title, date }: IreportItem) => {
  return (
    <div
      key={id}
      className=" flex justify-between border-b-[1px] border-gray-200 py-[20px] px-[20px] ">
      <div className="flex flex-col">
        <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center mb-[12px] ">
          부동산
        </div>

        <div className="text-base font-bold mb-[12px]">{title} </div>
        <div className="text-gray-400 mt-[16px]">{formatDate(date)}</div>
      </div>
      <div className="w-[132px] h-[93px] relative">
        <Image src={'/images/detail/News.png'} fill alt="News" />
      </div>
    </div>
  );
};
