import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { usePathname } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// API 데이터 타입 정의
interface RentData {
  year: number;
  quarter: number;
  region: string;
  rent: number;
}

interface VacancyRateData {
  year: number;
  quarter: number;
  region: string;
  vacancyRate: number;
}

interface ApiData {
  rent: RentData[];
  vacancyrate: VacancyRateData[];
}

// 차트 데이터 타입 정의
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    borderColor: string;
    backgroundColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointRadius: number;
    pointHoverRadius: number;
    fill: boolean;
  }[];
}

// 랜덤 색상 생성 함수
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CommercialRentChart: React.FC = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  console.log(lastSegment);
  // API에서 데이터를 가져오는 함수

  const fetchData = async (): Promise<ApiData> => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/building/rate/${lastSegment}?type=오피스`
    );
    return response.data;
  };
  const chartRef = useRef(null);

  // 선택된 연도와 분기를 관리하는 상태
  const [startYear, setStartYear] = useState<number>(2022);
  const [startQuarter, setStartQuarter] = useState<number>(1);
  const [endYear, setEndYear] = useState<number>(2024);
  const [endQuarter, setEndQuarter] = useState<number>(2);

  // 지역별 색상을 저장하는 상태
  const [regionColors, setRegionColors] = useState<{ [key: string]: string }>({});

  // 변환된 데이터를 관리할 상태
  const [filteredData, setFilteredData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  // useQuery로 데이터 패칭
  const { data, error, isLoading } = useQuery({
    queryKey: ['rentData', lastSegment],
    queryFn: fetchData
  });

  // 데이터를 필터링하고 변환하는 함수
  const transformAndFilterData = (): ChartData => {
    if (!data || !data.rent) return { labels: [], datasets: [] };

    // 사용자가 선택한 기간에 맞게 데이터를 필터링
    const filteredRentRates = data.rent.filter((item) => {
      const startCondition =
        item.year > startYear ||
        (item.year === startYear && item.quarter >= startQuarter);
      const endCondition =
        item.year < endYear || (item.year === endYear && item.quarter <= endQuarter);
      return startCondition && endCondition;
    });

    // 레이블 생성
    const labels = Array.from(
      new Set(filteredRentRates.map((item) => `${item.year}.${item.quarter}Q`))
    );

    // 지역별로 데이터셋 생성
    const regions = Array.from(new Set(filteredRentRates.map((item) => item.region)));
    const newRegionColors = { ...regionColors };

    const datasets = regions.map((region) => {
      // 해당 지역의 색상이 아직 없다면 랜덤 색상을 생성
      if (!newRegionColors[region]) {
        newRegionColors[region] = generateRandomColor();
      }
      const regionData = filteredRentRates.filter((item) => item.region === region);
      return {
        label: region,
        data: labels.map((label) => {
          const [year, quarter] = label.split('.');
          const quarterData = regionData.find(
            (item) =>
              item.year === parseInt(year) && item.quarter === parseInt(quarter[0])
          );
          return quarterData ? quarterData.rent : null; // 데이터가 없을 경우 null 반환
        }),
        borderColor: newRegionColors[region],
        backgroundColor: newRegionColors[region],
        pointBackgroundColor: newRegionColors[region],
        pointBorderColor: newRegionColors[region],
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      };
    });

    // 지역별 색상을 상태에 저장
    setRegionColors(newRegionColors);

    return { labels, datasets };
  };

  // 검색 기간을 검증하는 함수
  const validateSearchPeriod = () => {
    if (startYear > endYear || (startYear === endYear && startQuarter > endQuarter)) {
      alert('잘못된 검색 기간입니다. 시작 날짜가 종료 날짜보다 앞서야 합니다.');
      return false;
    }
    return true;
  };

  /* eslint-disable  react-hooks/exhaustive-deps */
  // 검색 기간 변경 시 자동 필터링
  useEffect(() => {
    if (validateSearchPeriod()) {
      const transformedData = transformAndFilterData();
      setFilteredData(transformedData);
    }
  }, [startYear, startQuarter, endYear, endQuarter, data]);

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
        intersect: false
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value: number | null) => {
          return value !== null ? value.toString() : '';
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
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        display: true,
        beginAtZero: false,
        grid: {
          display: true
        },
        ticks: {
          stepSize: 0.5
        }
      }
    },
    elements: {
      line: {
        tension: 0.3 // 이 값을 낮추면 선이 직선에 가까워지고, 공백이 줄어듭니다.
      },
      point: {
        pointStyle: 'circle'
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end space-x-2">
        <div>
          {/* <label htmlFor="startYear">검색기간</label> */}
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}>
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            id="startQuarter"
            value={startQuarter}
            onChange={(e) => setStartQuarter(parseInt(e.target.value))}>
            {[1, 2, 3, 4].map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarter}분기
              </option>
            ))}
          </select>
          ~
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}>
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            id="endQuarter"
            value={endQuarter}
            onChange={(e) => setEndQuarter(parseInt(e.target.value))}>
            {[1, 2, 3, 4].map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarter}분기
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

export default CommercialRentChart;
