import React from 'react';
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

const FloatingPopulationChart = () => {
  const stackedData = {
    labels: [
      '2022-10',
      '2022-11',
      '2022-12',
      '2023-01',
      '2023-02',
      '2023-03',
      '2023-04',
      '2023-05',
      '2023-06',
      '2023-07',
      '2023-08',
      '2023-09'
    ],
    datasets: [
      {
        label: '승차승객',
        data: [2.1, 2.0, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.0, 4.1, 4.2],
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: [2.2, 2.1, 2.2, 2.6, 2.7, 2.9, 3.0, 3.1, 3.3, 3.4, 3.5, 3.7],
        backgroundColor: '#A28DFF'
      },
      {
        label: '전체승객',
        data: [4.3, 4.1, 4.5, 5.1, 5.5, 5.9, 6.2, 6.6, 7.1, 7.4, 7.6, 7.9],
        backgroundColor: '#7D4E57'
      }
    ]
  };

  const groupedData = {
    labels: ['강남', '홍대', '신촌', '서울대', '연세대'],
    datasets: [
      {
        label: '승차승객',
        data: [3.2, 3.0, 2.9, 3.1, 3.3],
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: [3.5, 3.4, 3.2, 3.3, 3.5],
        backgroundColor: '#A28DFF'
      }
    ]
  };

  const stackedOptions = {
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
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: true
        }
      }
    }
  };

  const groupedOptions = {
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
        stacked: false,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
      <div className="w-full max-w-4xl h-[400px] mb-[50px]">
        <Bar data={stackedData} options={stackedOptions} />
      </div>
      <div className="w-full max-w-4xl h-[400px]">
        <Bar data={groupedData} options={groupedOptions} />
      </div>
    </div>
  );
};

export default FloatingPopulationChart;
