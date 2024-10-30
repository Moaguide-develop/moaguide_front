import MovieChart from './MovieChart';
import MovieContent from './MovieContent';
import MovieStats from './MovieStats';
import MovieTenChart from './MovieTenChart';
import Schedule from './Schedule';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { basicAxiosInstance } from '@/service/axiosInstance';

const ContentProductDetail = ({
  url,
  genre,
  name
}: {
  url: string;
  genre: string;
  name: string | undefined;
}) => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const response = await basicAxiosInstance.get(`/detail/content/sub/${lastSegment}`);
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['Schedule', lastSegment],
    queryFn: fetchData
  });
  return (
    <div>
      {genre === 'MOVIE' ? (
        <div className="max-w-[1000px] mx-auto mt-[32px]">
          <div className=" text-2xl font-bold mb-[20px]">개봉당시 2주 경쟁작</div>
          {data?.stats[0] && (
            <div>
              <Schedule />
            </div>
          )}

          <MovieContent name={name} />

          {data?.stats[0] && (
            <div>
              <div className=" text-2xl font-bold mb-[20px] mt-[30px]">통계정보</div>
              <MovieStats />
              <MovieChart />
              <MovieTenChart />
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto mt-[32px]">
          <div className="w-full h-[400px] flex  justify-center items-center bg-gray-200">
            <div className=" text-gray-400">서비스 준비중</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentProductDetail;
