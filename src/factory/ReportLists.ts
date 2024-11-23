import { basicAxiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchStudyGuides = async ({ pageParam = 1 }) => {
  try {
    const { data } = await basicAxiosInstance.get(`/study/guide`);
    return {
      content: data.roadmap,
      nextPage: pageParam + 1,
      isLast: data.roadmap.length < 10 || !data.roadmap.length || data.nextCursor === null
    };
  } catch (error) {
    console.error('StudyGuides 를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getStudyGuides = (category: string, subCategory: string, sort: string) => {
  const queryKey = ['StudyGuides', category, subCategory, sort];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
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

const fetchArticleList = async ({ pageParam = null }) => {
  try {
    const url = pageParam ? `/study/article?nextCursor=${pageParam}` : '/study/article';
    const { data } = await basicAxiosInstance.get(url);
    return {
      content: data.articleList,
      nextPage: data.nextCursor,
      isLast: !data.nextCursor
    };
  } catch (error) {
    console.error('ArticleList 를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getArticles = () => {
  const queryKey = ['ArticleList'];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchArticleList,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      initialPageParam: null
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
