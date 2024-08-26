import { IProductDetail } from '@/types/ProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axios.get(`https://api.moaguide.com/detail/${product_id}`);
  return data;
};

export const getProductDetail = (product_id: string) => {
  const queryKey = ['ReportIssues', product_id];

  const { data, ...queryProps } = useQuery<IProductDetail>({
    queryKey,
    queryFn: fetchProductDetail
  });

  return {
    data,
    ...queryProps
  };
};
