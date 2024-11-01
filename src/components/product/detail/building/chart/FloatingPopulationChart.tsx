import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { ISubwayData } from '@/types/BuildingProductType';
import { basicAxiosInstance } from '@/service/axiosInstance';
import { TooltipItem } from 'chart.js';

const FloatingPopulationChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const response = await basicAxiosInstance.get<ISubwayData>(
      `/detail/building/subway/${lastSegment}?year=2023&month=12`
    );
    return response.data;
  };
  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['floatingpopulation', lastSegment],
    queryFn: fetchData
  });
  const subwayMonthDateData = data?.subwayMonth?.map((subwayMonth) => subwayMonth.day);
  const subwayMonthTotalBoardingData = data?.subwayMonth?.map(
    (subwayMonth) => subwayMonth.boarding
  );

  const subwayMonthTotalAlightingData = data?.subwayMonth?.map(
    (subwayMonth) => subwayMonth.alighting
  );

  const subwayDayData = data?.subwayDay?.map((subwayDay) => subwayDay.day);
  const subwayDayTotalBoardingData = data?.subwayDay?.map(
    (subwayDay) => subwayDay.boarding
  );

  const subwayDayTotalAlightingData = data?.subwayDay?.map(
    (subwayDay) => subwayDay.alighting
  );
  const stackedData = {
    labels: subwayMonthDateData,
    datasets: [
      {
        label: '승차승객',
        data: subwayMonthTotalBoardingData,
        backgroundColor: '#89a3ff'
      },
      {
        label: '하차승객',
        data: subwayMonthTotalAlightingData,
        backgroundColor: '#8468ff'
      }
    ]
  };

  const groupedData = {
    labels: subwayDayData,
    datasets: [
      {
        label: '승차승객',
        data: subwayDayTotalBoardingData,
        backgroundColor: '#89a3ff'
      },
      {
        label: '하차승객',
        data: subwayDayTotalAlightingData,
        backgroundColor: '#8468ff'
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
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label} : ${value?.toLocaleString()}명\n`;
          }
        }
      },
      datalabels: {
        display: false // 데이터 레이블 숨기기
      }
      // customText: customTextPlugin
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
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label} : ${value?.toLocaleString()}명\n`;
          }
        }
      },
      datalabels: {
        display: false // 데이터 레이블 숨기기
      }
      // customText: customTextPlugin
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

  return (
    <div>
      <div className="text-gray-400 mb-[10px]"> 1km 이내 주변 지하철 승하차 승객수</div>

      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px] mb-[50px]">
          <div className="flex justify-end text-lg font-bold">일별 승하차 승객수</div>
          <Bar data={groupedData} options={groupedOptions} />
        </div>

        <div className="w-full max-w-4xl h-[400px] ">
          <div className="flex justify-end text-lg font-bold">월별 승하차 승객수</div>
          <Bar data={stackedData} options={stackedOptions} />
        </div>
      </div>
    </div>
  );
};

export default FloatingPopulationChart;
