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
import ChartDataLabels from 'chartjs-plugin-datalabels';
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

/* eslint-disable @typescript-eslint/no-unused-vars */
const CommercialRentChart = () => {
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
        data: [23.4, 23.6, 23.8, 24.0, 24.1, 24.2, 24.3, 24.5, 24.8],
        borderColor: '#1E90FF',
        backgroundColor: '#1E90FF',
        pointBackgroundColor: '#1E90FF',
        pointBorderColor: '#1E90FF',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      },
      {
        label: '강남',
        data: [22.7, 22.8, 23.0, 23.1, 23.3, 23.4, 23.5, 23.7, 23.9],
        borderColor: '#8A4AF3',
        backgroundColor: '#8A4AF3',
        pointBackgroundColor: '#8A4AF3',
        pointBorderColor: '#8A4AF3',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      },
      {
        label: '고대역',
        data: [21.3, 21.5, 21.6, 21.7, 21.8, 21.8, 21.9, 21.9, 21.7],
        borderColor: '#228B22',
        backgroundColor: '#228B22',
        pointBackgroundColor: '#228B22',
        pointBorderColor: '#228B22',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
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
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        display: true,
        beginAtZero: false,
        grid: {
          display: true
        },
        ticks: {
          stepSize: 0.5
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
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default CommercialRentChart;
