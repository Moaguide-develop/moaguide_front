import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReportLists = async ({
  queryKey,
  pageParam = 1
}: {
  queryKey: any[];
  pageParam?: number;
}) => {
  const [, category, subCategory, sort] = queryKey;

  const { data } = await axios.get(
    `https://api.moaguide.com/content/report/list/${category}?page=1&size=10&subcategory=${subCategory}&sort=${sort}`
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

export const getReportLists = (category: string, subCategory: string, sort: string) => {
  const queryKey = ['ReportLists', category, subCategory, sort];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchReportLists,
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
