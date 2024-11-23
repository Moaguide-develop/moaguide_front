import { basicAxiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchNewsList = async ({
  queryKey,
  pageParam = 1
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  try {
    const [, category] = queryKey;
    const { data } = await basicAxiosInstance.get(
      `/detail/news/${category}?page=${pageParam}&size=10`
    );
    return data;
  } catch (error) {
    console.error('뉴스 리스트를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

const useNewsList = (category: string) => {
  const queryKey = ['NewsList', category];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchNewsList,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return allPages.length + 1;
      },
      initialPageParam: 1,
      enabled: !!category
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading
  };
};

export default useNewsList;
