import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/* eslint-disable @typescript-eslint/no-unused-vars */
const CommercialVacancyRateChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState('1년');

  const data = {
    labels: [
      '2022.1Q',
      '2022.2Q',
      '2022.3Q',
      '2022.4Q',
      '2023.1Q',
      '2023.2Q',
      '2023.3Q',
      '2023.4Q',
      '2024.1Q'
    ],
    datasets: [
      {
        label: '서울',
        data: [7.1, 6.4, 6.9, 6.4, 6.1, 6.2, 6.5, 6.2, 5.9],
        backgroundColor: '#8A4AF3'
      },
      {
        label: '강남',
        data: [4.8, 4.5, 4.9, 4.4, 4.2, 4.3, 4.4, 4.3, 4.1],
        backgroundColor: '#1E90FF'
      },
      {
        label: '고대역',
        data: [6.2, 5.8, 6.1, 5.7, 5.6, 5.7, 5.8, 5.6, 5.8],
        backgroundColor: '#228B22'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
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
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true
        },
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          className="w-[55px] mr-2 p-2 rounded-lg bg-purple-500 text-white"
          onClick={() => setChartData('1년')}>
          1년
        </button>
        <button
          className="w-[55px] p-2 rounded-lg bg-gray-300"
          onClick={() => setChartData('전체')}>
          전체
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default CommercialVacancyRateChart;
