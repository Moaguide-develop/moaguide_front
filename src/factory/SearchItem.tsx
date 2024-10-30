import { basicAxiosInstance } from '@/service/axiosInstance';
import type { SearchedItem } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';

const fetchSearchItem = async (keyword: string) => {
  try {
    const { data } = await basicAxiosInstance.get(`/search?keyword=${keyword}`);
    return data;
  } catch (e) {
    throw new Error('Failed to fetch');
  }
};

export const getSearchItem = (keyword: string) => {
  const queryKey = ['SearchItem', keyword];

  const { data, error, ...queryProps } = useQuery<SearchedItem[]>({
    queryKey,
    queryFn: () => fetchSearchItem(keyword),
    enabled: !!keyword
  });

  if (error) {
    console.error(error);
  }

  return {
    data,
    error,
    ...queryProps
  };
};
