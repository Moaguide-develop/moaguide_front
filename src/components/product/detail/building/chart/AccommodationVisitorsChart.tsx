import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { IStayDayData } from '@/types/BuildingProductType';
import { TooltipItem } from 'chart.js';

const AccommodationVisitorsChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  const [startYear, setStartYear] = useState<number>(2022);
  const [endYear, setEndYear] = useState<number>(2024);
  const fetchData = async () => {
    const response = await axios.get<IStayDayData>(
      `https://api.moaguide.com/detail/building/stay/day/${lastSegment}?syear=${startYear}&eyear=${endYear}`
    );
    return response.data;
  };
  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['accommodationVisitordata', lastSegment, startYear, endYear],
    queryFn: fetchData
  });

  const accommodationVisitorDay = data?.object.map((item) => item.day);

  const accommodationVisitorData = (() => {
    if (!data?.object) return [];

    const totalArray = data.object.map((item) => item.total);
    const nodayArray = data.object.map((item) => item.noday);
    const onedayArray = data.object.map((item) => item.oneday);
    const twodayArray = data.object.map((item) => item.twoday);
    const threedayArray = data.object.map((item) => item.threeday);

    return [totalArray, nodayArray, onedayArray, twodayArray, threedayArray];
  })();

  const chartData = {
    labels: accommodationVisitorDay,
    datasets: [
      {
        label: '전체',
        data: accommodationVisitorData[0],
        backgroundColor: '#89a3ff'
      },
      {
        label: '무박',
        data: accommodationVisitorData[1],
        backgroundColor: '#6243ee'
      },
      {
        label: '1박',
        data: accommodationVisitorData[2],
        backgroundColor: '#aea0e9'
      },
      {
        label: '2박',
        data: accommodationVisitorData[3],
        backgroundColor: '#3343f1'
      },
      {
        label: '3박이상',
        data: accommodationVisitorData[4],
        backgroundColor: '#e435ed'
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
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return ``;
          },
          beforeBody: function (context: TooltipItem<'bar'>[]) {
            const index = context[0].dataIndex;
            const datasets = context[0].chart.data.datasets;

            let tooltipText = '';
            datasets.forEach((dataset) => {
              const value = dataset.data[index] as number;
              tooltipText += `${dataset.label}: ${value.toLocaleString()}명\n`;
            });

            return tooltipText;
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
      <div className="flex justify-end"></div>
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
        <div className="w-full max-w-4xl h-[400px]">
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationVisitorsChart;
