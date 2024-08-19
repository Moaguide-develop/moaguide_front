import React from 'react';
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

const CopyRightFeeChart = () => {
  const data = {
    labels: [
      '9월 말',
      '12월 말',
      '3월 말',
      '6월 말',
      '9월 말',
      '12월 말',
      '3월 말',
      '6월 말',
      '9월 말',
      '12월 말',
      '3월 말'
    ],
    datasets: [
      {
        type: 'bar' as const,
        label: '저작권료',
        data: [66, 66, 66, 66, 66, 66, 91, 91, 91, 91, 66],
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
          gradient.addColorStop(0, 'rgba(140, 192, 250, 0.8)'); // 하늘색
          gradient.addColorStop(1, '#2575d1'); // 파란색

          return gradient;
        },
        yAxisID: 'y1',
        borderRadius: 5,
        barThickness: 40,
        datalabels: {
          align: 'end' as const,
          anchor: 'end' as const,
          color: '#000',
          formatter: (value: number) => `${value}원`
        }
      },
      {
        type: 'line' as const,
        label: '시가저작권료',
        data: [1.52, 1.62, 1.45, 1.7, 1.52, 1.62, 1.45, 1.7, 1.62, 1.5, 1.72],
        borderColor: '#0000FF', // 남색
        backgroundColor: '#0000FF', // 남색
        pointBackgroundColor: '#0000FF', // 남색
        pointBorderColor: '#0000FF', // 남색
        fill: false,
        tension: 0,
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
        max: 300, // y축 최대값을 100으로 설정,
        ticks: {
          stepSize: 10 // y축 눈금 간격을 10으로 설정
        }
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          display: false
        },
        max: 2.5,
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
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
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
      <div className="w-full max-w-5xl h-[500px]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default CopyRightFeeChart;
