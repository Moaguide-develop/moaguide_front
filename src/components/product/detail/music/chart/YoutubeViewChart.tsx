import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import { IContentYoutubeViewCharts } from '@/types/MusicProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const YoutubeViewChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState('100');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringData(e.target.id);
  };

  const fetchData = async () => {
    try {
      const response = await basicAxiosInstance.get<IContentYoutubeViewCharts>(
        `/detail/music/view/${lastSegment}?month=${filteringData}`
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
    queryKey: ['YoutubeViewChart', filteringData, lastSegment],
    queryFn: fetchData
  });
  const chartRef = useRef(null);

  const YoutubeDay = (YoutubeData && YoutubeData?.map((item) => item.day)) || [];

  const YoutubeCount =
    (YoutubeData && YoutubeData?.map((item) => Number(item.value))) || [];
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
        pointStyle: 'circle'
      }
    }
  };

  return (
    <div>
      {/* <div className="text-base text-gray-500 mb-[10px]">매월 1일 누적 조회수 차트</div> */}
      <section className=" mb-[30px] h-[70px] flex  items-center desk:overflow-x-scroll desk2:overflow-x-visible scrollbar-hide  ">
        {/* <input
          type="radio"
          id="1"
          className=" mr-[5px] hidden "
          checked={filteringData == '1'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="1"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg whitespace-nowrap ${
            filteringData === '1w' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          1주일
        </label> */}
        <input
          type="radio"
          id="6"
          className=" mr-[5px] hidden"
          checked={filteringData == '6'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="6"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg whitespace-nowrap ${
            filteringData === '6' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          6개월
        </label>
        <input
          type="radio"
          id="12"
          className=" mr-[5px] hidden"
          checked={filteringData + '' == '12'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="12"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg whitespace-nowrap ${
            filteringData === '12' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          1년
        </label>
        <input
          type="radio"
          id="36"
          className=" mr-[5px] hidden"
          checked={filteringData + '' == '36'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="36"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg whitespace-nowrap ${
            filteringData === '36' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
          }`}>
          3년
        </label>
        <input
          type="radio"
          id="100"
          className=" mr-[5px] hidden"
          checked={filteringData + '' == '100'}
          onChange={handleFiltering}
        />
        <label
          htmlFor="100"
          className={`cursor-pointer  mr-[10px] px-4 py-2 border rounded-lg whitespace-nowrap ${
            filteringData === '100'
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
