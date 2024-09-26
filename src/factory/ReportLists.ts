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
  const url = pageParam ? `https://api.moaguide.com/study/article?nextCursur=${pageParam}` : 'https://api.moaguide.com/study/article';
  
  console.log("Fetching next page with nextCursur:", pageParam); // 디버깅용 콘솔 로그
  
  const { data } = await axios.get(url);

  return {
    content: data.articleList, // 아티클 리스트
    nextPage: data.nextCursur,  // 다음 페이지를 위한 nextCursur 값
    isLast: !data.nextCursur,  // 다음 페이지가 없으면 true로 처리
  };
};

export const getArticles = () => {
  const queryKey = ['ArticleList']; // 고유 쿼리 키

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchArticleList,  // 아티클 API 호출 함수
      getNextPageParam: (lastPage) => {
        console.log("Last page:", lastPage); // 디버깅용 콘솔 로그
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      initialPageParam: null, // 첫 호출 시에는 nextCursur가 null
    });

  return {
    data: data?.pages.flatMap((page) => page.content) || [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  };
};