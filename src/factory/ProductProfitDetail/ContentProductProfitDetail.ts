import { IContentProductProfitDetail } from '@/types/ContentProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchContentProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axios.get(
    `https://api.moaguide.com/detail/contents/base/${product_id}`
  );
  return data;
};

export const getContentProductProfitDetail = (product_id: string) => {
  const queryKey = ['ContentProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<IContentProductProfitDetail>({
    queryKey,
    queryFn: fetchContentProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
