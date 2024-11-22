import { IMusicBulidingStockPriceChart } from '@/types/MusicProductType';
import { TooltipItem } from 'chart.js';

const ChartOption = ({ data }: { data: IMusicBulidingStockPriceChart }) => {
  const labels =
    (data?.transaction && data?.transaction?.map((item) => item.day).reverse()) || [];

  const values =
    (data?.transaction &&
      data?.transaction?.map((item) => Number(item.value)).reverse()) ||
    [];

  const chartData = {
    labels,
    datasets: [
      {
        label: '주가',
        data: values,
        borderColor: '#8a4af3',
        backgroundColor: '#8a4af3',
        pointBackgroundColor: '#8a4af3',
        pointBorderColor: '#8a4af3',
        pointRadius: 0,
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
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()}원\n`;
          }
        }
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
        offset: true
      },
      y: {
        display: true,
        beginAtZero: true,
        max: data.max,
        min: data.min,
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

  return { chartData, options };
};

export default ChartOption;
