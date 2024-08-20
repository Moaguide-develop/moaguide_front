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
    `${process.env.BASE_URL}/content/news/${category}?page=${pageParam}&size=10&sort=${sort}`
  );
  return data;
};

export const getIssueLists = (category: string, sort: string) => {
  const queryKey = ['IssueLists', category, sort];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchIssueLists,
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
    hasNextPage: !!data?.pages.length,
    isFetching,
    isFetchingNextPage,
    isLoading
  };
};
