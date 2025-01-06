import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { IMusicBulidingStockPriceChart } from '@/types/MusicProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const BuildingStockPriceChart = () => {
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
      throw error;
    }
  };

  const { data: StockPriceData } = useQuery({
    queryKey: ['BuildingStockPriceChart', filteringData, lastSegment],
    queryFn: fetchData
  });

  const StockPriceDate =
    (StockPriceData?.transaction &&
      StockPriceData?.transaction?.map((item) => item.day).reverse()) ||
    [];

  const StockPriceCount =
    (StockPriceData?.transaction &&
      StockPriceData?.transaction?.map((item) => Number(item.value)).reverse()) ||
    [];

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
        offset: true
      },
      y: {
        display: true,
        beginAtZero: true,
        // max: newVariable,
        max: StockPriceData?.max,
        min: StockPriceData?.min,
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

export default BuildingStockPriceChart;
