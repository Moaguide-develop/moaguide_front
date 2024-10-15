import Image from 'next/image';
import { formatDate } from '@/utils/FormatDate';
import UseNewsList from '@/factory/useNewsList';
import { useCallback } from 'react';
import NoticeItemSkeleton from '@/components/skeleton/NoticeItemSkeleton';
import { Virtuoso } from 'react-virtuoso';
import { INewsItem } from '@/types/BuildingProductType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORY } from '@/static/category';
import { axiosInstance } from '@/service/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const News = () => {
  const pathname = usePathname();
  // URL의 마지막 부분 추출
  const category = pathname.split('/').pop() as string;

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

const NewsItem = ({ title, date, id, category, link, imgUrl }: INewsItem) => {
  const fetchData = async ({ id }: { id: number }) => {
    console.log(id);
    const response = await axiosInstance.post(`https://api.moaguide.com/news/view/${id}`);
    return response.data;
  };

  const CountupView = () => {
    const view = useMutation({
      mutationFn: fetchData,
      onError: () => {}
    });
    return view;
  };

  const view = CountupView();

  const Category = CATEGORY;

  return (
    <Link
      href={link}
      key={id}
      className=" flex justify-between border-b-[1px] border-gray-200 py-[20px] px-[20px] rounded-lg"
      onClick={() => {
        view.mutate({ id });
      }}>
      <div className="flex w-full ">
        <div className=" flex-shrink-0 flex items-center justify-center ">
          <Image
            src={`${imgUrl}`}
            width={132}
            height={93}
            alt="News"
            className="flex items-center desk2:w-[132px] desk2:h-[93px] desk:w-[82px] desk:h-[73px] object-cover rounded-[8px] desk:mt-[10px]  desk2:[mt-0px]"
          />
        </div>

        {/* <div className="ml-[16px] mt-[15px] desk:max-w-[180px] desk2:max-w-full  flex-shrink  "> */}
        <div className="flex flex-col ml-[16px] mt-[10px] w-full">
          <div className="text-base font-bold  desk:h-[48px] line-clamp-2 ">{title}</div>
          <div className="flex justify-between w-full desk:mt-[10px] ">
            <div className="text-gray-400 ">{Category[category]}</div>
            <div className="text-gray-400 ">{formatDate(date)}</div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Link>
  );
};
