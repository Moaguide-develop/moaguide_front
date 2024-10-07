import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchStudyGuides = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`https://api.moaguide.com/study/guide`);
  return {
    content: data.roadmap, 
    nextPage: pageParam + 1,
    isLast: data.roadmap.length < 10 || !data.roadmap.length || data.nextCursor === null,
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
    isLoading,
  };
};


const fetchArticleList = async ({ pageParam = null }) => {
  const url = pageParam ? `https://api.moaguide.com/study/article?nextCursor=${pageParam}` : 'https://api.moaguide.com/study/article';
  
  console.log("Fetching next page with nextCursor:", pageParam); 
  
  const { data } = await axios.get(url);

  return {
    content: data.articleList, 
    nextPage: data.nextCursor,  
    isLast: !data.nextCursor,  
  };
};

export const getArticles = () => {
  const queryKey = ['ArticleList']; 

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchArticleList,  
      getNextPageParam: (lastPage) => {
        console.log("Last page:", lastPage);
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      initialPageParam: null, 
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