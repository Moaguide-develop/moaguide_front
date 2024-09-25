import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchStudyGuides = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`https://api.moaguide.com/study/guide?page=${pageParam}&size=3`);
  return {
    content: data.roadmaps,
    nextPage: pageParam + 1,
    totalPages: data.total,
    totalElements: data.roadmaps.length,
    currentPage: data.page,
    isLast: data.page + 1 >= data.total
  };
};

export const getStudyGuides = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['StudyGuides'],
      queryFn: fetchStudyGuides,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      initialPageParam: 1,
      enabled: true
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