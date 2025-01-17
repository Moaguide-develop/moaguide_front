import { axiosInstance } from '@/service/axiosInstance';
import { ICowProductProfitDetail } from '@/types/Product/CowProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchCowProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/hanwoo/base/${product_id}`);
  return data;
};

export const getCowProductProfitDetail = (product_id: string) => {
  const queryKey = ['CowProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<ICowProductProfitDetail>({
    queryKey,
    queryFn: fetchCowProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
