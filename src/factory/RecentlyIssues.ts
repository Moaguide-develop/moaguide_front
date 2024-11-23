import { basicAxiosInstance } from '@/service/axiosInstance';
import type { MainNews } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';

const fetcheRecentlyIssues = async () => {
  try {
    const { data } = await basicAxiosInstance.get(`/content/news/`);
    return data;
  } catch (error) {
    console.error('RecentlyIssues를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getRecentlyIssues = () => {
  const queryKey = ['RecentlyIssues'];

  const { data, ...queryProps } = useQuery<MainNews[]>({
    queryKey,
    queryFn: fetcheRecentlyIssues
  });

  return {
    data,
    ...queryProps
  };
};
