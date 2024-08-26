'use client';

import type { RealtimeRankType } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRealtimeRank = async () => {
  try {
    const { data } = await axios.get(`https://api.moaguide.com/searchRank`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getRealtimeRank = () => {
  const queryKey = ['RealtimeRank'];

  const { data, error, ...queryProps } = useQuery<RealtimeRankType[]>({
    queryKey,
    queryFn: fetchRealtimeRank
  });
  if (error) {
    console.error('Error fetching realtime rank:', error);
  }
  return {
    data,
    error,
    ...queryProps
  };
};
