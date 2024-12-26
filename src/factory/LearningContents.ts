import { basicAxiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchOverviewContents = async () => {
  try {
    const { data } = await basicAxiosInstance.get('/contents/overview');
    return {
      popularContents: data.popularContents || [],
      recentContents: data.recentContents || [],
      latestNewsClipping: data.latestNewsClipping || [],
    };
  } catch (error) {
    console.error('Overview API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getOverviewContents = () => {
  const queryKey = ['OverviewContents'];

  const { data, error, ...queryProps } = useQuery({
    queryKey,
    queryFn: fetchOverviewContents,
  });

  if (error) {
    console.error('Error fetching OverviewContents:', error);
  }

  return {
    data,
    error,
    ...queryProps,
  };
};