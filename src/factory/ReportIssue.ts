import { MainReportNewsType } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReportIssues = async () => {
  const { data } = await axios.get(`https://api.moaguide.com/`);
  return data;
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
