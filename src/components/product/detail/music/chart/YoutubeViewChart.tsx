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
import { IContentYoutubeViewCharts } from '@/types/MusicProductType';

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

const YoutubeViewChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  console.log(lastSegment);
  const [filteringData, setFilteringData] = useState('all');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idWithoutSuffix = e.target.id.replace('-youtube', '');
    setFilteringData(idWithoutSuffix);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<IContentYoutubeViewCharts>(
        `https://api.moaguide.com/detail/music/view/${lastSegment}?date=${filteringData}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 useQuery의 onError로 전달
    }
  };

  const {
    data: YoutubeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['YoutubeViewChart', filteringData],
    queryFn: fetchData
  });
  const chartRef = useRef(null);

  const YoutubeDay = (YoutubeData && YoutubeData?.map((item) => item.viewCount)) || [];

  const YoutubeCount =
    (YoutubeData && YoutubeData?.map((item) => Number(item.viewDate))) || [];
  const sortedYoutubeCount = [...YoutubeCount].sort((a, b) => b - a);
  const maxYoutubeCount = sortedYoutubeCount[0] || 0;
  const averageYoutubeCount =
    YoutubeCount.reduce((acc, val) => acc + val, 0) / YoutubeCount.length || 0;
  const newVariable = Math.floor(maxYoutubeCount + averageYoutubeCount);

  const dataSets = {
    labels: YoutubeDay,
    data: YoutubeCount
  };

  const data = {
    labels: dataSets.labels,
    datasets: [
      {
        label: '조회수',
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
        offset: true
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
      <div className="text-base text-gray-500 mb-[10px]">매월 1일 누적 조회수 차트</div>
      <section className=" mb-[30px]">
        <input
          type="radio"
          id="1w-youtube"
          className=" mr-[5px] hidden "
          checked={filteringData + '-youtube' == '1w-youtube'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="1w-youtube"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '1w' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          1주일
        </label>
        <input
          type="radio"
          id="6m-youtube"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtube' == '6m-youtube'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="6m-youtube"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '6m' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          6개월
        </label>
        <input
          type="radio"
          id="12m-youtube"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtube' == '12m-youtube'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="12m-youtube"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '12m'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700'
          }`}>
          1년
        </label>
        <input
          type="radio"
          id="36m-youtube"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtube' == '36m-youtube'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="36m-youtube"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '36m'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700'
          }`}>
          3년
        </label>
        <input
          type="radio"
          id="all-youtube"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtube' == 'all-youtube'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="all-youtube"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700'
          }`}>
          전체
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

export default YoutubeViewChart;