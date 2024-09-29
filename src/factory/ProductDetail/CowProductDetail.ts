import { ICowProductDetail } from '@/types/CowProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchCowProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axios.get(
    `https://api.moaguide.com/detail/hanwoo/${product_id}`
  );
  return data;
};

export const getCowProductDetail = (product_id: string) => {
  const queryKey = ['CowProductDetail', product_id];

  const { data, ...queryProps } = useQuery<ICowProductDetail>({
    queryKey,
    queryFn: fetchCowProductDetail
  });

  return {
    data,
    ...queryProps
  };
};
