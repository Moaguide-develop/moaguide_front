import Image from 'next/image';
import { formatDate } from '@/utils/FormatDate';
import UseReportList from '@/factory/useReportList';
import { useCallback } from 'react';
import { IreportItem } from '@/types/BuildingProductType';
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

  //여기 계쏙 콘솔 찍히는 이유 알아오기
  const MOCK = {
    report: [
      {
        id: 59322,
        title: 'A-Z까지 소액으로 조각 투자의 시작!',
        category: 'building',
        link: 'https://www.businesspost.co.kr/BP?command=article_view&num=358394',
        date: '2024-07-10T08:34:00.000+00:00'
      },
      {
        id: 52303,
        title: '뭐든 쪼개는 ‘조각 투자’… 송아지부터 엔진까지 산다',
        category: 'building',
        link: 'https://n.news.naver.com/mnews/article/082/0001277150?sid=101',
        date: '2024-06-30T18:08:00.000+00:00'
      },
      {
        id: 59634,
        title: 'A-Z까지 소액으로 조각 투자의 시작!',
        category: 'building',
        link: 'http://www.globalepic.co.kr/view.php?ud=20240617103758156348439a4874_29',
        date: '2024-06-17T10:42:00.000+00:00'
      },
      {
        id: 58238,
        title: '틱톡 코리아 The8 , 더청담문화예술아카데미와 MOU 체결',
        category: 'building',
        link: 'http://www.globalepic.co.kr/view.php?ud=20240617103758156348439a4874_29',
        date: '2024-06-17T10:42:00.000+00:00'
      }
    ],
    total: 6,
    page: 1,
    size: 10
  };
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
