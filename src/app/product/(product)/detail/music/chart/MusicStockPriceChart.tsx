import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { IMusicBulidingStockPriceChart } from '@/types/Product/MusicProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const MusicStockPriceChart = () => {
  const chartRef = useRef(null);
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState('3');

  const fetchData = async () => {
    try {
      const response = await basicAxiosInstance.get<IMusicBulidingStockPriceChart>(
        `/detail/transaction/${lastSegment}?month=${filteringData}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 useQuery의 onError로 전달
    }
  };

  const { data: MusicStockPriceData } = useQuery({
    queryKey: ['MusicStockPriceChart', filteringData, lastSegment],
    queryFn: fetchData
  });

  const StockPriceDate = MusicStockPriceData?.transaction
    ?.map((item) => item.day)
    .reverse() || ['0'];

  const StockPriceCount = MusicStockPriceData?.transaction
    ?.map((item) => Number(item.value))
    .reverse() || [0];

  // const sortedStockPriceCount = [...StockPriceCount].sort((a, b) => b - a);
  // const maxStockPriceCount = sortedStockPriceCount[0] || 0;

  // const averageStockPriceCount =
  //   StockPriceCount.reduce((acc, val) => acc + val, 0) / StockPriceCount.length || 0;

  // const newVariable = Math.floor(maxStockPriceCount + averageStockPriceCount);

  const data = {
    labels: StockPriceDate,
    datasets: [
      {
        label: '주가',
        data: StockPriceCount,
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
      tooltip: {
        // enabled: StockPriceCount.length > 0,
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()}원\n`;
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
        offset: true // x축의 첫 번째 데이터 포인트를 약간 오른쪽으로 이동
      },
      y: {
        display: true,
        beginAtZero: true,
        max: MusicStockPriceData?.max,
        min: MusicStockPriceData?.min,
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
    <>
      <div className="mb-4  flex justify-end">
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
    </>
  );
};

export default MusicStockPriceChart;
