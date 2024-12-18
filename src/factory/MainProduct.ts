import { axiosInstance, basicAxiosInstance } from '@/service/axiosInstance';
import type { MainProductItem } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';

const fetchMainProduct = async (category: string) => {
  try {
    let url = '';
    if (category === 'all') {
      url = `/summary/list?category=${category}&subcategory=trade&sort=lastDivide_rate desc&page=1&size=3`;
    } else {
      url = `/home/list?category=${category}`;
    }

    const { data } = await basicAxiosInstance.get(url);
    return data.product;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const getMainProduct = (category: string) => {
  const queryKey = ['MainProduct', category];

  const { data, error, ...queryProps } = useQuery<MainProductItem[]>({
    queryKey,
    queryFn: () => fetchMainProduct(category)
  });

  if (error) {
    console.error('Error fetching realtime rank:', error);
  }

  return {
    data,
    error,
    ...queryProps
  };
};

const fetchMainProductLogin = async (category: string) => {
  try {
    let url = '';
    if (category === 'all') {
      url = `/summary/list?category=${category}&subcategory=trade&sort=lastDivide_rate desc&page=1&size=3`;
    } else {
      url = `/home/list?category=${category}`;
    }

    const { data } = await axiosInstance.get(url);
    return data.product;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const getMainProductLogin = (category: string) => {
  const queryKey = ['MainProductLogin', category];

  const { data, error, refetch, ...queryProps } = useQuery<MainProductItem[]>({
    queryKey,
    queryFn: () => fetchMainProductLogin(category)
  });

  if (error) {
    console.error('Error fetching realtime rank:', error);
  }

  return {
    data,
    error,
    refetch,
    ...queryProps
  };
};
