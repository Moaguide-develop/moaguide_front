import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import { IMusicStreamingChart } from '@/types/Product/MusicProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const YoutubeStreamingChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState('100');

  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringData(e.target.id);
  };

  const fetchData = async () => {
    try {
      const response = await basicAxiosInstance.get<IMusicStreamingChart>(
        `/detail/music/streaming/${lastSegment}?month=${filteringData}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 useQuery의 onError로 전달
    }
  };

  const { data: StreamingData } = useQuery({
    queryKey: ['StreamingChart', filteringData, lastSegment],
    queryFn: fetchData
  });
  const chartRef = useRef(null);

  const StreamingDay =
    (StreamingData?.steamingDto && StreamingData?.steamingDto?.map((item) => item.day)) ||
    [];

  const StreamingCount =
    (StreamingData?.steamingDto &&
      StreamingData?.steamingDto?.map((item) => Number(item.value))) ||
    [];

  const dataSets = {
    labels: StreamingDay,
    data: StreamingCount
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
        pointRadius: 0,
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
      _tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()}회\n`;
          }
        }
      },
      get tooltip() {
        return this._tooltip;
      },
      set tooltip(value) {
        this._tooltip = value;
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
        max: StreamingData?.max,
        min: StreamingData?.min,
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

export default YoutubeStreamingChart;
