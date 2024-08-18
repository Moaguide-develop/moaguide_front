import { MainReportNewsType, RealtimeRankType } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRealtimeRank = async () => {
  const { data } = await axios.get('https://api.moaguide.com/searchRank');
  return data;
};

export const getRealtimeRank = () => {
  const queryKey = ['RealtimeRank'];

  const { data, ...queryProps } = useQuery<RealtimeRankType[]>({
    queryKey,
    queryFn: fetchRealtimeRank
  });

  return {
    data,
    ...queryProps
  };
};
