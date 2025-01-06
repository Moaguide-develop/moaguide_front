import { axiosInstance } from '@/service/axiosInstance';
import { IBuildingProductDetail } from '@/types/Product/BuildingProductType';
import { IMusicProductDetail } from '@/types/Product/MusicProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const fetchMusicProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/music/${product_id}`);
  return data;
};

export const getMusicProductDetail = (product_id: string) => {
  const queryKey = ['MusicProductDetail', product_id];

  const { data, ...queryProps } = useQuery<IMusicProductDetail>({
    queryKey,
    queryFn: fetchMusicProductDetail
  });

  return {
    data,
    ...queryProps
  };
};
