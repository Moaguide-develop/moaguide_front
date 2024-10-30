import { basicAxiosInstance } from '@/service/axiosInstance';
import type { MainNews } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';

const fetcheRecentlyIssues = async () => {
  const { data } = await basicAxiosInstance.get(`/content/news/`);
  return data;
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
