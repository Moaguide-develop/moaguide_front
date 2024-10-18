import { axiosInstance } from '@/service/axiosInstance';
import { IContentProductProfitDetail } from '@/types/ContentProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchContentProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1];
  const genre = context.queryKey[2];
  const { data } = await axiosInstance.get(
    `https://api.moaguide.com/detail/content/base/${product_id}?genre=${genre}`
  );
  return data;
};

export const getContentProductProfitDetail = (product_id: string, genre: string) => {
  const queryKey = ['ContentProductProfitDetail', product_id, genre];

  const { data, ...queryProps } = useQuery<IContentProductProfitDetail>({
    queryKey,
    queryFn: fetchContentProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
