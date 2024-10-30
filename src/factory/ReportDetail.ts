import { basicAxiosInstance } from '@/service/axiosInstance';
import type { ReportListsItem } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';

const fetchReportDetail = async (id: number) => {
  try {
    const { data } = await basicAxiosInstance.get(`/content/report/${id}`);
    return data;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const getReportDetail = (id: number) => {
  const queryKey = ['ReportDetail', id];

  const { data, error, ...queryProps } = useQuery<ReportListsItem>({
    queryKey,
    queryFn: () => fetchReportDetail(id)
  });

  if (error) {
    console.error(error);
  }

  return {
    data,
    error,
    ...queryProps
  };
};
