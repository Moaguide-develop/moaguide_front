import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FloatingPopulationChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/building/subway/${lastSegment}?year=2023&month=12`
    );
    return response.data;
  };
  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['floatingpopulation', lastSegment],
    queryFn: fetchData
  });
  const subwayWeekTotalBoardingData = data?.subwayWeek.map(
    (item: any) => item.totalBoarding
  );
  const subwayWeekTotalAlightingData = data?.subwayWeek.map(
    (item: any) => item.totalAlighting
  );

  const subwayDayTotalBoardingData = data?.subwayTime.boarding;

  const subwayDayTotalAlightingData = data?.subwayTime.alighting;
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
        data: subwayDayTotalBoardingData,
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: subwayDayTotalAlightingData,
        backgroundColor: '#A28DFF'
      }
    ]
  };

  const groupedData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '승차승객',
        data: subwayWeekTotalBoardingData,
        backgroundColor: '#FF6B6B'
      },
      {
        label: '하차승객',
        data: subwayWeekTotalAlightingData,
        backgroundColor: '#A28DFF'
      }
    ]
  };

  const customTextPlugin = {
    id: 'customText',
    beforeDraw: (chart: any) => {
      const { datasets } = chart.data;
      const hasData = datasets.some((dataset: any) =>
        dataset.data.some((value: number) => value !== 0)
      );
      if (!hasData) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '16px Arial';
        ctx.fillText('준비중입니다', width / 2, height / 2);
        ctx.restore();
      }
    }
  };

  ChartJS.register(customTextPlugin);

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
      },
      datalabels: {
        display: false // 데이터 레이블 숨기기
      },
      customText: customTextPlugin
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
      },
      datalabels: {
        display: false // 데이터 레이블 숨기기
      },
      customText: customTextPlugin
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
