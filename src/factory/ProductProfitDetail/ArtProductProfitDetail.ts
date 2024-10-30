import { axiosInstance } from '@/service/axiosInstance';
import { IArtProductProfitDetail } from '@/types/ArtProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchArtProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/art/base/${product_id}`);
  return data;
};

export const getArtProductProfitDetail = (product_id: string) => {
  const queryKey = ['ArtProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<IArtProductProfitDetail>({
    queryKey,
    queryFn: fetchArtProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
