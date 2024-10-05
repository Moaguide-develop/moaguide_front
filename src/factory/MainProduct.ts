import type { MainProductItem } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMainProduct = async (category: string) => {
  try {
    const { data } = await axios.get(
      `https://api.moaguide.com/summary/list?category=${category}&subcategory=trade&sort=lastDivide_rate desc&page=1&size=3`
    );
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
