import { IContentMovieCharts } from '@/types/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRef, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const filteringLabel = {
  screen: '스크린 수',
  showtime: '상영 횟수',
  audience: '관객 수',
  revenue: '수익',
  rank: '순위'
} as const;
type FilteringDataKey = keyof typeof filteringLabel;

const MovieChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState<FilteringDataKey>('screen');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringData(e.target.id as FilteringDataKey);
  };

  const fetchData = async () => {
    const response = await axios.get<IContentMovieCharts>(
      `https://api.moaguide.com/detail/content/${filteringData}/${lastSegment}`
    );
    return response.data;
  };

  const {
    data: MovieData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['MovieChart', filteringData, lastSegment],
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
    <div className="mt-[60px]">
      <section className="mb-[15px]">
        <input
          type="radio"
          id="screen"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'screen'}
          onChange={handleFiltering}
        />
        <label htmlFor="screen" className="mr-[10px] cursor-pointer">
          날짜별 스크린 수
        </label>
        <input
          type="radio"
          id="showtime"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'showtime'}
          onChange={handleFiltering}
        />
        <label htmlFor="showtime" className="mr-[10px] cursor-pointer">
          날짜별 상영횟수
        </label>
        <input
          type="radio"
          id="audience"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'audience'}
          onChange={handleFiltering}
        />
        <label htmlFor="audience" className="mr-[10px] cursor-pointer">
          날짜별 관객수
        </label>
        <input
          type="radio"
          id="revenue"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'revenue'}
          onChange={handleFiltering}
        />
        <label htmlFor="revenue" className="mr-[10px] cursor-pointer">
          날짜별 매출액
        </label>
        <input
          type="radio"
          id="rank"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'rank'}
          onChange={handleFiltering}
        />
        <label htmlFor="rank" className="mr-[10px] cursor-pointer">
          날짜별 순위
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

export default MovieChart;
