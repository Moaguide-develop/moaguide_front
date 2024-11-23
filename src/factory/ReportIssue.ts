import { basicAxiosInstance } from '@/service/axiosInstance';
import { MainReportNewsType } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';

const fetchReportIssues = async () => {
  try {
    const { data } = await basicAxiosInstance.get(`/`);
    return data;
  } catch (error) {
    console.error('ReportIssues 를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getReportIssues = () => {
  const queryKey = ['ReportIssues'];

  const { data, ...queryProps } = useQuery<MainReportNewsType>({
    queryKey,
    queryFn: fetchReportIssues
  });

  const mainReport = data?.mainReport || [];
  const mainNews = data?.mainNews || [];

  return {
    mainReport,
    mainNews,
    ...queryProps
  };
};
