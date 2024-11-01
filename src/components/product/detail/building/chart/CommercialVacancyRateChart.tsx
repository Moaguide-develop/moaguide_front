import { useQuery } from '@tanstack/react-query';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, TooltipItem } from 'chart.js';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { basicAxiosInstance } from '@/service/axiosInstance';

interface RentData {
  year: number;
  quarter: number;
  region: string;
  value: number;
}

interface ApiResponse {
  vacancyrate: {
    [region: string]: RentData[];
  };
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CommercialVacancyRateChart = ({ rentType }: { rentType: boolean | undefined }) => {
  const [buildingType, setBuildingType] = useState<string>('오피스'); // 소규모 or 중대형
  const [startYear, setStartYear] = useState<number>(2022);
  const [endYear, setEndYear] = useState<number>(2024);
  const [chartData, setChartData] = useState<any>(null);
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  useEffect(() => {
    setBuildingType(rentType ? '오피스' : '소규모');
  }, [rentType, setBuildingType]);

  const fetchData = async () => {
    const response = await basicAxiosInstance.get<ApiResponse>(
      `/detail/building/vacancyrate/${lastSegment}?type=${buildingType}&syear=${startYear}&eyear=${endYear}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'CommercialVacancyRateChart',
      buildingType,
      startYear,
      endYear,
      lastSegment
    ],
    queryFn: fetchData
  });

  useEffect(() => {
    if (data) {
      processChartData(data);
    }
  }, [data, buildingType, startYear, endYear, lastSegment]);

  useEffect(() => {
    if (startYear > endYear) {
      alert('시작 연도는 종료 연도보다 클 수 없습니다.');
      setStartYear(endYear);
    }
  }, [startYear, endYear]);

  const processChartData = (data: ApiResponse) => {
    if (!data || !data.vacancyrate) return; // data 또는 data.vacancyrate가 유효한지 확인

    const labelsSet: Set<string> = new Set();
    const datasets: any[] = [];

    Object.keys(data.vacancyrate)?.forEach((region) => {
      const regionData = data.vacancyrate[region];
      const values = regionData?.map((item) => {
        const label = `${item.year} Q${item.quarter}`;
        labelsSet.add(label);
        return item.value;
      });
      const color = getRandomColor();

      datasets.push({
        label: region,
        data: values,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      });
    });

    const labels = Array.from(labelsSet).sort();

    setChartData({ labels, datasets });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()}%\n`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => value.toString(),
        color: 'black'
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 2
      }
    }
  } as ChartOptions<'bar'>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
      {!rentType && (
        <div className=" flex justify-end">
          <button
            className={` mr-2 p-2 rounded-lg ${buildingType === '소규모' ? 'bg-purple-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setBuildingType('소규모')}>
            소규모
          </button>
          <button
            className={` mr-2 p-2 rounded-lg ${buildingType === '중대형' ? 'bg-purple-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setBuildingType('중대형')}>
            중대형
          </button>
        </div>
      )}
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

export default CommercialVacancyRateChart;
