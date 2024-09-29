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
import {
  IContentYoutubeSearchCharts,
  IContentYoutubeViewCharts
} from '@/types/MusicProductType';

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

const YoutubeSearchChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  console.log(lastSegment);
  const [filteringData, setFilteringData] = useState('all');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idWithoutSuffix = e.target.id.replace('-youtubeserach', '');
    setFilteringData(idWithoutSuffix);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<IContentYoutubeSearchCharts>(
        `https://api.moaguide.com/detail/music/search/${lastSegment}?date=${filteringData}`
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

  const YoutubeSearchDay = (YoutubeData && YoutubeData?.map((item) => item.date)) || [];

  const YoutubeSearchCount =
    (YoutubeData && YoutubeData?.map((item) => Number(item.value))) || [];
  const sortedYoutubeSearchCount = [...YoutubeSearchCount].sort((a, b) => b - a);
  const maxYoutubeSearchCount = sortedYoutubeSearchCount[0] || 0;
  const averageYoutubeSearchCount =
    YoutubeSearchCount.reduce((acc, val) => acc + val, 0) / YoutubeSearchCount.length ||
    0;
  const newVariable = Math.floor(maxYoutubeSearchCount + averageYoutubeSearchCount);

  const dataSets = {
    labels: YoutubeSearchDay,
    data: YoutubeSearchCount
  };

  const data = {
    labels: dataSets.labels,
    datasets: [
      {
        label: '검색량',
        data: dataSets.data,
        borderColor: '#4fff6f',
        backgroundColor: '#4fff6f',
        pointBackgroundColor: '#4fff6f',
        pointBorderColor: '#4fff6f',
        pointRadius: 0,
        pointHoverRadius: 0,
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
        pointStyle: undefined,
        radius: 0
      }
    }
  };

  return (
    <div>
      <section className=" mb-[30px]">
        <input
          type="radio"
          id="1w-youtubeserach"
          className=" mr-[5px] hidden "
          checked={filteringData + '-youtubeserach' == '1w-youtubeserach'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="1w-youtubeserach"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '1w' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          1주일
        </label>
        <input
          type="radio"
          id="6m-youtubeserach"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtubeserach' == '6m-youtubeserach'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="6m-youtubeserach"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '6m' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          6개월
        </label>
        <input
          type="radio"
          id="12m-youtubeserach"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtubeserach' == '12m-youtubeserach'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="12m-youtubeserach"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '12m'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700'
          }`}>
          1년
        </label>
        <input
          type="radio"
          id="36m-youtubeserach"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtubeserach' == '36m-youtubeserach'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="36m-youtubeserach"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg ${
            filteringData === '36m'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700'
          }`}>
          3년
        </label>
        <input
          type="radio"
          id="all-youtubeserach"
          className=" mr-[5px] hidden"
          checked={filteringData + '-youtubeserach' == 'all-youtubeserach'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="all-youtubeserach"
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

export default YoutubeSearchChart;
