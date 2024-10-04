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
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PopulationInformationChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  console.log(lastSegment);

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/building/population/${lastSegment}?year=2023&month=12`
    );
    return response.data;
  };
  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['populationinformation', lastSegment],
    queryFn: fetchData
  });
  console.log(data?.populations);
  const populationData =
    data?.populations?.map((population: { total: number }) => population.total) || [];
  const Chartdata = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '인구수',
        data: populationData,
        backgroundColor: '#4A90E2',
        borderRadius: 5, // 막대의 끝을 둥글게 만듦
        barThickness: 20 // 막대의 두께 설정,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // 범례를 숨김
      },
      tooltip: {
        enabled: true,
        intersect: false
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'end' as const,
        color: 'black',
        font: {
          weight: 'bold' as const
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false // x축의 그리드를 숨김
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: Math.max(...populationData) * 1.5, // y축의 최대값 설정
        grid: {
          display: false // y축의 그리드를 숨김
        },
        ticks: {
          display: false, //y축 삭제
          stepSize: 1000 // y축의 눈금 간격 설정
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
      <div className="w-full max-w-4xl h-[400px]">
        <Bar data={Chartdata} options={options} />
      </div>
    </div>
  );
};

export default PopulationInformationChart;
