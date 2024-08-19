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

const PopulationInformationChart = () => {
  const data = {
    labels: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ],
    datasets: [
      {
        label: '인구수',
        data: [241, 123, 232, 453, 111, 111, 111, 111, 111, 111, 111, 111],
        backgroundColor: '#4A90E2',
        borderRadius: 5, // 막대의 끝을 둥글게 만듦
        barThickness: 15 // 막대의 두께 설정,
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
        grid: {
          display: false // y축의 그리드를 숨김
        },
        ticks: {
          stepSize: 100 // y축의 눈금 간격 설정
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PopulationInformationChart;
