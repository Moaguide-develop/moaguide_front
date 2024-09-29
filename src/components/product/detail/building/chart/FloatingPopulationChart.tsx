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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FloatingPopulationChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  console.log(lastSegment);

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/building/subway/${lastSegment}?year=2023&month=12`
    );
    return response.data;
  };
  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['floatingpopulation'],
    queryFn: fetchData
  });

  const stackedData = {
    labels: [
      '05-06',
      '06-07',
      '07-08',
      '08-09',
      '09-10',
      '10-11',
      '11-12',
      '12-13',
      '13-14',
      '14-15',
      '15-16',
      '16-17',
      '17-18',
      '18-19',
      '19-20',
      '20-21',
      '21-22',
      '22-23'
    ],
    datasets: [
      {
        label: '승차승객',
        data: [
          2.1, 2.0, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.0, 4.1, 4.2, 6.7, 6.8, 6.9, 7.0,
          7.1, 7.2
        ],
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: [
          2.2, 2.1, 2.2, 2.6, 2.7, 2.9, 3.0, 3.1, 3.3, 3.4, 3.5, 3.7, 4.0, 4.1, 4.2, 4.3,
          4.4, 4.5
        ],
        backgroundColor: '#A28DFF'
      }
    ]
  };

  const groupedData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '승차승객',
        data: [3.2, 3.0, 2.9, 3.1, 3.3, 3.5, 3.6],
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: [3.5, 3.4, 3.2, 3.3, 3.5, 3.6, 4.0],
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
