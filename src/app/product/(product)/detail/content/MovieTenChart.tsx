import { IContentMovieCharts } from '@/types/Product/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';

import { useRef, useState } from 'react';
import { basicAxiosInstance } from '@/service/axiosInstance';

const filteringLabel = {
  tenscreen: '스크린 수',
  tenshowtime: '상영 횟수',
  tenaudience: '관객 수',
  tenrevenue: '수익',
  tenrank: '순위'
} as const;
type FilteringDataKey = keyof typeof filteringLabel;

const MovieTenChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState<FilteringDataKey>('tenscreen');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringData(e.target.id as FilteringDataKey);
  };

  const fetchData = async () => {
    const response = await basicAxiosInstance.get<IContentMovieCharts>(
      `/detail/content/${filteringData}/ten/${lastSegment}`
    );
    return response.data;
  };

  const {
    data: MovieData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['MovieTenChart', filteringData, lastSegment],
    queryFn: fetchData
  });

  const chartRef = useRef(null);

  const Movieday = MovieData?.map((item) => item.day) || [];

  const Moviecount = MovieData?.map((item) => item.count) || [];
  const sortedMoviecount = [...Moviecount].sort((a, b) => b - a);
  const maxMoviecount = sortedMoviecount[0] || 0;
  const averageMoviecount =
    Moviecount.reduce((acc, val) => acc + val, 0) / Moviecount.length || 0;
  const newVariable = Math.floor(maxMoviecount + averageMoviecount);

  const dataSets = {
    labels: Movieday,
    data: Moviecount
  };

  const data = {
    labels: dataSets.labels,
    datasets: [
      {
        label: filteringLabel[filteringData],
        data: dataSets.data,
        borderColor: '#8a4af3',
        backgroundColor: '#8a4af3',
        pointBackgroundColor: '#8a4af3',
        pointBorderColor: '#8a4af3',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        datalabels: {
          display: false // 선 차트에는 숫자 표시 비활성화
        }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        intersect: false
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        offset: true // x축의 첫 번째 데이터 포인트를 약간 오른쪽으로 이동
      },
      y: {
        display: true,
        beginAtZero: true,
        max: newVariable,
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0
      },
      point: {
        pointStyle: 'circle'
      }
    }
  };

  return (
    <div>
      <section className="mb-[15px]">
        <input
          type="radio"
          id="tenscreen"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'tenscreen'}
          onChange={handleFiltering}
        />
        <label htmlFor="tenscreen" className="mr-[10px] cursor-pointer">
          개봉10일 스크린 수
        </label>
        <input
          type="radio"
          id="tenshowtime"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'tenshowtime'}
          onChange={handleFiltering}
        />
        <label htmlFor="tenshowtime" className="mr-[10px] cursor-pointer">
          개봉10일 상영횟수
        </label>
        <input
          type="radio"
          id="tenaudience"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'tenaudience'}
          onChange={handleFiltering}
        />
        <label htmlFor="tenaudience" className="mr-[10px] cursor-pointer">
          개봉10일 관객수
        </label>
        <input
          type="radio"
          id="tenrevenue"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'tenrevenue'}
          onChange={handleFiltering}
        />
        <label htmlFor="tenrevenue" className="mr-[10px] cursor-pointer">
          개봉10일 매출액
        </label>
        <input
          type="radio"
          id="tenrank"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'tenrank'}
          onChange={handleFiltering}
        />
        <label htmlFor="tenrank" className="mr-[10px] cursor-pointer">
          개봉10일 순위
        </label>
      </section>

      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MovieTenChart;
