import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import { IContentYoutubeSearchCharts } from '@/types/Product/MusicProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const YoutubeSearchChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState('100');

  // const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilteringData(e.target.id);
  // };

  const fetchData = async () => {
    try {
      const response = await basicAxiosInstance.get<IContentYoutubeSearchCharts>(
        `/detail/music/search/${lastSegment}?month=${filteringData}`
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
    queryKey: ['YoutubeSearchChart', filteringData, lastSegment],
    queryFn: fetchData
  });
  const chartRef = useRef(null);

  const YoutubeSearchDay = (YoutubeData && YoutubeData?.map((item) => item.day)) || [];

  const YoutubeSearchCount =
    (YoutubeData && YoutubeData?.map((item) => Number(item.value))) || [];
  const sortedYoutubeSearchCount = [...YoutubeSearchCount].sort((a, b) => b - a);
  const maxYoutubeSearchCount = sortedYoutubeSearchCount[0] || 0;
  const averageYoutubeSearchCount =
    YoutubeSearchCount?.reduce((acc, val) => acc + val, 0) / YoutubeSearchCount.length ||
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
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()}회\n`;
          }
        }
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
      <div className="mb-4  flex justify-start">
        <button
          className={`w-[55px] mr-2 p-2  rounded-lg ${filteringData === '3' ? 'bg-purple-500 text-white' : 'bg-gray-300  '}`}
          onClick={() => setFilteringData('3')}>
          3개월
        </button>
        <button
          className={`w-[55px] mr-2 p-2 rounded-lg ${filteringData === '6' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setFilteringData('6')}>
          6개월
        </button>
        <button
          className={`w-[55px] mr-2 p-2 rounded-lg ${filteringData === '12' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setFilteringData('12')}>
          1년
        </button>
        <button
          className={`w-[55px] p-2 rounded-lg ${filteringData === '100' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setFilteringData('100')}>
          전체
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default YoutubeSearchChart;
