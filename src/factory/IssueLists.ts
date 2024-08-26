import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchIssueLists = async ({
  queryKey,
  pageParam = 1
}: {
  queryKey: any[];
  pageParam?: number;
}) => {
  const [, category, sort] = queryKey;

  const { data } = await axios.get(
    `https://api.moaguide.com/content/news/${category}?page=${pageParam}&size=10&sort=${sort}`
  );

  return {
    content: data.content,
    nextPage: pageParam + 1,
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    currentPage: data.number,
    isLast: data.last
  };
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
