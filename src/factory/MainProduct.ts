import { axiosInstance } from '@/service/axiosInstance';
import type { MainProductItem } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMainProduct = async (category: string) => {
  try {
    let url = '';
    if (category === 'all') {
      url = `https://api.moaguide.com/summary/list?category=${category}&subcategory=trade&sort=lastDivide_rate desc&page=1&size=3`;
    } else {
      url = `https://api.moaguide.com/home/list?category=${category}`;
    }

    const { data } = await axios.get(url);
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
      url = `https://api.moaguide.com/summary/list?category=${category}&subcategory=trade&sort=lastDivide_rate desc&page=1&size=3`;
    } else {
      url = `https://api.moaguide.com/home/list?category=${category}`;
    }

    const { data } = await axiosInstance.get(url);
    return data.product;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const getMainProductLogin = (category: string) => {
  const queryKey = ['MainProduct', category];

  const { data, error, ...queryProps } = useQuery<MainProductItem[]>({
    queryKey,
    queryFn: () => fetchMainProductLogin(category)
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
