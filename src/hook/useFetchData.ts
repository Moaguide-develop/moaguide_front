import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const useFetchDataWithPath = (urlTemplate: string, queryKey: string) => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop() || ''; // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const url = urlTemplate.replace('{lastSegment}', lastSegment);
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData
  });

  return { data, error, isLoading };
};

export default useFetchDataWithPath;
