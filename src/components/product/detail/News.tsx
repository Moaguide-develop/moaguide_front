import Image from 'next/image';
import { formatDate } from '@/utils/FormatDate';
import UseNewsList from '@/factory/useNewsList';
import { useCallback } from 'react';
import NoticeItemSkeleton from '@/components/skeleton/NoticeItemSkeleton';
import { Virtuoso } from 'react-virtuoso';
import { INewsItem } from '@/types/BuildingProductType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const News = () => {
  const pathname = usePathname();
  // URL의 마지막 부분 추출
  const category = pathname.split('/').pop() as string;

  console.log(encodeURIComponent(category));

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    UseNewsList(category);
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && !isLoading) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading]);
  const allPosts = data?.pages.flatMap((page) => page.news) || [];

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
          itemContent={(index, item: INewsItem) => <NewsItem key={item.id} {...item} />}
        />
      )}
    </div>
  );
};

export default News;

const NewsItem = ({ title, date, id, category, link }: INewsItem) => {
  return (
    <Link
      href={link}
      key={id}
      className=" flex justify-between border-b-[1px] border-gray-200 py-[20px] px-[20px] rounded-lg">
      <div className="flex">
        <div className="w-[132px] h-[93px] relative">
          <Image src={'/images/detail/News.png'} fill alt="News" />
        </div>

        <div className="ml-[16px] mt-[15px] desk:max-w-[150px] desk2:max-w-full">
          <div className="text-base font-bold">{title} </div>
          <div className="text-gray-400 mt-[16px]">
            {category === 'building' ? <>부동산</> : undefined}
          </div>
        </div>
      </div>

      <div className="text-gray-400 flex items-end mb-[12px]">{formatDate(date)}</div>
    </Link>
  );
};
