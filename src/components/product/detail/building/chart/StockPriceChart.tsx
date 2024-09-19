import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 각 기간에 해당하는 데이터의 타입 정의
type TimePeriod = '3개월' | '6개월' | '1년';

const StockPriceChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState<TimePeriod>('1년');

  const dataSets: Record<TimePeriod, { labels: string[]; data: number[] }> = {
    '3개월': {
      labels: ['2023-10', '2023-11', '2023-12'],
      data: [4500, 3000, 3500]
    },
    '6개월': {
      labels: ['2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'],
      data: [4200, 3900, 3500, 4500, 3000, 3500]
    },
    '1년': {
      labels: [
        '2023-01',
        '2023-02',
        '2023-03',
        '2023-04',
        '2023-05',
        '2023-06',
        '2023-07',
        '2023-08',
        '2023-09',
        '2023-10',
        '2023-11',
        '2023-12'
      ],
      data: [4000, 4300, 3700, 3500, 4200, 4000, 3900, 3500, 4200, 4500, 3000, 3500]
    }
  };

  const data = {
    labels: dataSets[chartData].labels,
    datasets: [
      {
        label: '주가',
        data: dataSets[chartData].data,
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
        max: 6000,
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
          className={`w-[55px] mr-2 p-2  rounded-lg ${chartData === '3개월' ? 'bg-purple-500 text-white' : 'bg-gray-300  '}`}
          onClick={() => setChartData('3개월')}>
          3개월
        </button>
        <button
          className={`w-[55px] mr-2 p-2 rounded-lg ${chartData === '6개월' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setChartData('6개월')}>
          6개월
        </button>
        <button
          className={`w-[55px] p-2 rounded-lg ${chartData === '1년' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setChartData('1년')}>
          1년
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

export default StockPriceChart;
