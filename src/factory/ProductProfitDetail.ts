import { IProductProfitDetail } from '@/types/ProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axios.get(
    `https://api.moaguide.com/detail/building/base/${product_id}`
  );
  return data;
};

export const getProductProfitDetail = (product_id: string) => {
  const queryKey = ['ProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<IProductProfitDetail>({
    queryKey,
    queryFn: fetchProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
