import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-chartjs-2';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { IMusicCopyRightFeeChart } from '@/types/MusicProductType';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BuildingCopyRightFeeChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [filteringData, setFilteringData] = useState('100');

  const fetchData = async () => {
    try {
      const response = await axios.get<IMusicCopyRightFeeChart>(
        `https://api.moaguide.com/detail/divide/${lastSegment}?month=${filteringData}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 useQuery의 onError로 전달
    }
  };

  const {
    data: CopyRightFeeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['BuildingRightFeeChart', filteringData],
    queryFn: fetchData
  });

  const paymentDate =
    (CopyRightFeeData?.divide &&
      CopyRightFeeData?.divide.map((item) => item.paymentDate)) ||
    [];

  const CopyRightFeeDivideCount =
    (CopyRightFeeData?.divide &&
      CopyRightFeeData?.divide.map((item) => Number(item.divide))) ||
    [];
  const sortedCopyRightFeeDivideCount = [...CopyRightFeeDivideCount].sort(
    (a, b) => b - a
  );
  const maxCopyRightFeeDivideCount = sortedCopyRightFeeDivideCount[0] || 0;
  const averageCopyRightFeeDivideCount =
    CopyRightFeeDivideCount.reduce((acc, val) => acc + val, 0) /
      CopyRightFeeDivideCount.length || 0;

  const BarnewVariable =
    Math.floor(maxCopyRightFeeDivideCount + averageCopyRightFeeDivideCount) * 1.5;

  const CopyRightFeeDivideRateCount =
    (CopyRightFeeData?.divide &&
      CopyRightFeeData?.divide.map((item) => Number(item.divide_rate))) ||
    [];

  const sortedCopyRightFeeDivideRateCount = [...CopyRightFeeDivideRateCount].sort(
    (a, b) => b - a
  );
  const maxCopyRightFeeDivideRateCount = sortedCopyRightFeeDivideRateCount[0] || 0;
  const averageCopyRightFeeDivideRateCount =
    CopyRightFeeDivideRateCount.reduce((acc, val) => acc + val, 0) /
      CopyRightFeeDivideRateCount.length || 0;

  const LinenewVariable = Math.floor(
    maxCopyRightFeeDivideRateCount + averageCopyRightFeeDivideRateCount
  );

  const data = {
    labels: paymentDate,
    datasets: [
      {
        type: 'bar' as const,
        label: '배당금',
        data: CopyRightFeeDivideCount,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, 'rgba(140, 192, 250, 0.8)');
          gradient.addColorStop(1, '#2575d1');

          return gradient;
        },
        yAxisID: 'y1',
        borderRadius: 5,
        barThickness: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.5,

        datalabels: {
          align: 'end' as const,
          anchor: 'end' as const,
          color: '#000',
          formatter: (value: number) => `${value}원`
        }
      },
      {
        type: 'line' as const,
        label: '시가배당률',
        data: CopyRightFeeDivideRateCount,
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
        pointBackgroundColor: '#0000FF',
        pointBorderColor: '#0000FF',
        fill: false,
        tension: 0.4,
        yAxisID: 'y2',
        pointStyle: 'circle',
        pointRadius: 6,
        datalabels: {
          display: false
        }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        }
      },
      y1: {
        type: 'linear' as const,
        position: 'left' as const,
        grid: {
          display: false
        },
        beginAtZero: true,
        max: BarnewVariable,
        ticks: {
          stepSize: 10
        }
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          display: false
        },
        max: LinenewVariable,
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        display: true
      }
    }
  };

  return (
    <div>
      <div className=" flex justify-end">
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
          className={`w-[55px] mr-2  p-2 rounded-lg ${filteringData === '12' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
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
        <div className="w-full max-w-5xl h-[500px]">
          <Chart type="bar" data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BuildingCopyRightFeeChart;
