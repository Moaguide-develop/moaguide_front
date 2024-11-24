import { basicAxiosInstance } from '@/service/axiosInstance';
import type { RealtimeRankType } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';

const fetchRealtimeRank = async () => {
  try {
    const { data } = await basicAxiosInstance.get(`/searchRank`);
    return data;
  } catch (error) {
    console.error('RealtimeRank 를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getRealtimeRank = () => {
  const queryKey = ['RealtimeRank'];

  const { data, error, ...queryProps } = useQuery<RealtimeRankType[]>({
    queryKey,
    queryFn: fetchRealtimeRank
  });

  if (error) {
    console.error('RealtimeRank 를 가져오는 중 오류가 발생했습니다:', error);
  }

  return {
    data,
    error,
    ...queryProps
  };
};
