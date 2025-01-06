import { axiosInstance } from '@/service/axiosInstance';
import { ICowProductDetail } from '@/types/Product/CowProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchCowProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/hanwoo/${product_id}`);
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
