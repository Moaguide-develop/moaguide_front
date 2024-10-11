import { IContentProductDetail } from '@/types/ContentProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchContentProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axios.get(
    `https://api.moaguide.com/detail/content/${product_id}`
  );
  return data;
};

export const getContentProductDetail = (product_id: string) => {
  const queryKey = ['ContentProductDetail', product_id];

  const { data, ...queryProps } = useQuery<IContentProductDetail>({
    queryKey,
    queryFn: fetchContentProductDetail
  });

  return {
    data,
    ...queryProps
  };
};
