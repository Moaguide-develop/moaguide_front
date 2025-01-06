import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line } from 'react-chartjs-2';
import { usePathname } from 'next/navigation';
import { ChartOptions, TooltipItem } from 'chart.js';
import { basicAxiosInstance } from '@/service/axiosInstance';

// API 데이터 타입 정의
interface LandData {
  value: number;
  day: string;
}

interface ApiData {
  lands: LandData[];
}

// 차트 데이터 타입 정의
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointRadius: number;
    pointHoverRadius: number;
    fill: boolean;
  }[];
}

const OfficialPriceChart = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  // API에서 데이터를 가져오는 함수
  const fetchData = async (): Promise<ApiData> => {
    const response = await basicAxiosInstance.get(`/detail/building/land/${lastSegment}`);
    return response.data;
  };

  const chartRef = useRef(null);

  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2024);

  const [filteredData, setFilteredData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['landPriceData', lastSegment],
    queryFn: fetchData
  });

  const transformAndFilterData = (): ChartData => {
    if (!data || !data?.lands) return { labels: [], datasets: [] };

    const filteredLandPrices = data?.lands?.filter((item) => {
      const year = parseInt(item.day);
      return year >= startYear && year <= endYear;
    });

    const labels = filteredLandPrices?.map((item) => `${item.day}`).reverse();

    const datasets = [
      {
        label: '공시지가',
        data: filteredLandPrices?.map((item) => item.value).reverse(),
        borderColor: '#8A4AF3', // 선의 색상
        backgroundColor: '#8A4AF3',
        pointBackgroundColor: '#8A4AF3',
        pointBorderColor: '#8A4AF3',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      }
    ];

    return { labels, datasets };
  };

  const validateSearchPeriod = () => {
    if (startYear > endYear) {
      alert('잘못된 검색 기간입니다. 시작 날짜가 종료 날짜보다 앞서야 합니다.');
      return false;
    }
    return true;
  };

  const updateLabelVisibility = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    updateLabelVisibility();
    window.addEventListener('resize', updateLabelVisibility);
    return () => {
      window.removeEventListener('resize', updateLabelVisibility);
    };
  }, []);

  /* eslint-disable  react-hooks/exhaustive-deps */

  useEffect(() => {
    if (validateSearchPeriod()) {
      const transformedData = transformAndFilterData();
      setFilteredData(transformedData);
    }
  }, [startYear, endYear, data]);

  // 로딩 상태 처리
  if (isLoading) return <div>데이터를 불러오는 중...</div>;
  if (error)
    return (
      <div>데이터를 가져오는 데 오류가 발생했습니다: {(error as Error).message}</div>
    );

  // 차트 옵션
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label} : ${value?.toLocaleString()} 원/m²\n`;
          }
        }
      },
      datalabels: {
        display: false,
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => {
          return value !== null ? value.toLocaleString('ko-KR') : '';
        },
        color: '#000',
        font: {
          weight: 'bold'
        }
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
        beginAtZero: false,
        grid: {
          display: true
        },
        ticks: {
          callback: (value) => value.toLocaleString('ko-KR')
        }
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end space-x-2">
        <div>
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}>
            {[...Array(2025 - 2000).keys()].map((year) => (
              <option key={year + 2000} value={year + 2000}>
                {year + 2000}년
              </option>
            ))}
          </select>
          ~
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}>
            {[...Array(2025 - 2000).keys()].map((year) => (
              <option key={year + 2000} value={year + 2000}>
                {year + 2000}년
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Line ref={chartRef} data={filteredData} options={options} />
        </div>
      </div>
    </>
  );
};

export default OfficialPriceChart;
