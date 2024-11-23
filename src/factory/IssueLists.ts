import { basicAxiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchIssueLists = async ({
  queryKey,
  pageParam = 1
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  try {
    const [, category, sort] = queryKey;
    const { data } = await basicAxiosInstance.get(
      `/content/news/${category}?page=${pageParam}&size=10&sort=${sort}`
    );

    return {
      content: data.content,
      nextPage: pageParam + 1,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      currentPage: data.number,
      isLast: data.last
    };
  } catch (error) {
    console.error('IssueLists 를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getIssueLists = (category: string, sort: string) => {
  const queryKey = ['IssueLists', category, sort];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchIssueLists,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      initialPageParam: 1,
      enabled: !!category
    });

  return {
    data: data?.pages.flatMap((page) => page.content) || [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading
  };
};
