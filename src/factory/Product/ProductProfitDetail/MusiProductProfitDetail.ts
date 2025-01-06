import { axiosInstance } from '@/service/axiosInstance';
import { IMusicProductProfitDetail } from '@/types/MusicProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchMusicProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/music/base/${product_id}`);
  return data;
};

export const getMusicProductProfitDetail = (product_id: string) => {
  const queryKey = ['MusicProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<IMusicProductProfitDetail>({
    queryKey,
    queryFn: fetchMusicProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
