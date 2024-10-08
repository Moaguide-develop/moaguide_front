import { IContentMovieStats } from '@/types/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const MovieStats = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const response = await axios.get<IContentMovieStats>(
      `https://api.moaguide.com/detail/contents/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['MovieStats'],
    queryFn: fetchData
  });

  const formatNumber = (num: number | undefined): string | undefined => {
    if (num && num >= 100000000) {
      return `약 ${(num / 100000000).toFixed(1)}억`;
    } else if (num && num >= 10000) {
      return `약 ${(num / 10000).toFixed(1)}만`;
    }
    return String(num);
  };

  return (
    <div>
      {data?.stats[0].region}
      <div className="text-gray-400 mb-[10px]"> 주요 업무 지구</div>

      <div className="bg-gray-50 rounded-xl flex flex-col  desk:pl-[10px] md:pl-[0px] ">
        <div className="grid grid-cols-4 gap-x-4 mb-[40px] mt-[20px] text-center">
          <div className="text-gray-500 text-left"></div>
          <div className="text-gray-500">스크린수</div>
          <div className="text-gray-500">누적 매출액(점유율)</div>
          <div className="text-gray-500">누적관괙수(점유율)</div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 mb-[40px]">
          <div className="text-base flex justify-center">서울시</div>
          <div className="text-blue-500 text-center"> {data?.stats[0].screenCount}</div>
          <div className="text-blue-500 text-center desk:hidden md:block">
            {data?.stats[0].totalRevenue.toLocaleString()}({data?.stats[0].revenueShare}%)
          </div>
          <div className="text-blue-500 text-center desk:hidden md:block">
            {data?.stats[0].totalAudience.toLocaleString()}({data?.stats[0].audienceShare}
            %)
          </div>

          {/* 반응형일 때 억/ 만 단위로 */}
          <div className="text-blue-500 text-center desk:block md:hidden">
            {formatNumber(data?.stats[0].totalRevenue)}
          </div>
          <div className="text-blue-500 text-center desk:block md:hidden">
            {formatNumber(data?.stats[0].totalAudience)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 mb-[40px]">
          <div className="text-base flex justify-center">전국</div>
          <div className="text-blue-500 text-center"> {data?.stats[1].screenCount}</div>
          <div className="text-blue-500 text-center desk:hidden md:block">
            {data?.stats[1].totalRevenue.toLocaleString()}({data?.stats[0].revenueShare}%)
          </div>
          <div className="text-blue-500 text-center desk:hidden md:block">
            {data?.stats[1].totalAudience.toLocaleString()}({data?.stats[0].audienceShare}
            %)
          </div>

          {/* 반응형일 때 억/ 만 단위로 */}
          <div className="text-blue-500 text-center desk:block md:hidden">
            {formatNumber(data?.stats[1].totalRevenue)}
          </div>
          <div className="text-blue-500 text-center desk:block md:hidden">
            {formatNumber(data?.stats[1].totalAudience)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieStats;
