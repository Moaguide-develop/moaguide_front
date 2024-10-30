import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { IStayRateData } from '@/types/BuildingProductType';
import { Chart } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';
import { basicAxiosInstance } from '@/service/axiosInstance';

const AccommoationRateChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const [startYear, setStartYear] = useState<number>(2022);
  const [endYear, setEndYear] = useState<number>(2024);
  const fetchData = async () => {
    try {
      const response = await basicAxiosInstance.get<IStayRateData>(
        `/detail/building/stay/rate/${lastSegment}?syear=${startYear}&eyear=${endYear}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 useQuery의 onError로 전달
    }
  };

  const {
    data: CopyRightFeeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['AccommodationRate', startYear, lastSegment, endYear],
    queryFn: fetchData
  });

  const AccommodationRateDay = CopyRightFeeData?.object.map((item) => item.day);

  const AccommodationRatevalue = CopyRightFeeData?.object.map((item) => item.value);

  const AccommodationRateRate = CopyRightFeeData?.object.map((item) => item.rate);

  const data = {
    labels: AccommodationRateDay,
    datasets: [
      {
        type: 'bar' as const,
        label: '평균 숙박 일수',
        data: AccommodationRatevalue,
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
          gradient.addColorStop(0, 'rgba(140, 192, 250, 0.8)');
          gradient.addColorStop(1, '#2575d1');

          return gradient;
        },
        yAxisID: 'y1',
        borderRadius: 5,
        barThickness: 20,
        barPercentage: 0.2,
        categoryPercentage: 0.5,

        datalabels: {
          display: false,
          align: 'end' as const,
          anchor: 'end' as const,
          color: '#000',
          formatter: (value: number) => `${value}`
        }
      },
      {
        type: 'line' as const,
        label: '숙박 방문자 비율',
        data: AccommodationRateRate,
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
        pointBackgroundColor: '#0000FF',
        pointBorderColor: '#0000FF',
        fill: false,
        tension: 0.4,
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
        // max: BarnewVariable,
        ticks: {
          stepSize: 10
        }
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          display: false
        },
        // max: LinenewVariable,
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'bar' | 'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            const unit = context.dataset.type === 'bar' ? '일' : '%';
            // return `${label}: ${value.toLocaleString()}${unit}`;
            return ``;
          },
          beforeBody: function (context: TooltipItem<'bar' | 'line'>[]) {
            const index = context[0].dataIndex;
            const datasets = context[0].chart.data.datasets;

            let tooltipText = '';
            datasets.forEach((dataset) => {
              const value = dataset.data[index] as number;
              const unit = dataset.type === 'bar' ? '일' : '%';
              tooltipText += `${dataset.label}: ${value.toLocaleString()}${unit}\n`;
            });

            return tooltipText;
          }
        }
      },
      datalabels: {
        display: true
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div>
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="border rounded p-1">
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          ~
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            className="border rounded p-1">
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-5xl h-[500px]">
          <Chart type="bar" data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AccommoationRateChart;
