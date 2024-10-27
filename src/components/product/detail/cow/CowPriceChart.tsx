import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { use, useEffect, useRef, useState } from 'react';
import { ICowProductPrice } from '@/types/CowProductType';

const CowPriceChart = () => {
  const [filteringData, setFilteringData] = useState('averagePrice');
  const [DateData, setDateData] = useState('1');
  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringData(e.target.id);
  };

  const fetchData = async () => {
    const response = await axios.get<ICowProductPrice>(
      `https://api.moaguide.com/detail/hanwoo/sub/hanwooPrice?category=${filteringData}&month=${DateData}`
    );
    return response.data;
  };

  const {
    data: HanwooData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['HanwooChart', filteringData, DateData],
    queryFn: fetchData
  });

  const chartRef = useRef(null);

  const HanWooDate = HanwooData?.object?.map((item) => item.day) || [];
  const HanwooCount = HanwooData?.object?.map((item) => item.value) || [];

  const sortedHanwooCount = [...HanwooCount].sort((a, b) => b - a);
  const maxHanwooCount = sortedHanwooCount[0] || 0;
  const averageHanwooCount =
    HanwooCount.reduce((acc, val) => acc + val, 0) / HanwooCount.length || 0;
  const newVariable = Math.floor(maxHanwooCount + averageHanwooCount);

  const dataSets = {
    labels: HanWooDate,
    data: HanwooCount
  };
  const data = {
    labels: dataSets.labels,
    datasets: [
      {
        label: '한우 가격',
        // data: String(dataSets.data) + HanwooUnit,
        data: dataSets.data,
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
        intersect: false
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
        offset: true // x축의 첫 번째 데이터 포인트를 약간 오른쪽으로 이동
      },
      y: {
        display: true,
        beginAtZero: true,
        max: newVariable,
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

  return (
    <div>
      <section>
        <input
          type="radio"
          id="averagePrice"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'averagePrice'}
          onChange={handleFiltering}
        />
        <label htmlFor="averagePrice" className="mr-[10px]">
          두당 평균 도매가격
        </label>
        <input
          type="radio"
          id="cattlePrice"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'cattlePrice'}
          onChange={handleFiltering}
        />
        <label htmlFor="cattlePrice" className="mr-[10px]">
          거세우 평균가격
        </label>
        <input
          type="radio"
          id="grade1Rate"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'grade1Rate'}
          onChange={handleFiltering}
        />
        <label htmlFor="grade1Rate" className="mr-[10px]">
          1등급 이상 출현율
        </label>
        <input
          type="radio"
          id="productionCost"
          className=" mr-[5px] cursor-pointer"
          checked={filteringData == 'productionCost'}
          onChange={handleFiltering}
        />
        <label htmlFor="productionCost" className="mr-[10px]">
          두당 생산비
        </label>
      </section>
      <div className=" flex justify-end my-[15px]">
        <button
          className={`w-[55px] mr-2 p-2  rounded-lg ${DateData === '1' ? 'bg-purple-500 text-white' : 'bg-gray-300  '}`}
          onClick={() => setDateData('1')}>
          1년
        </button>
        <button
          className={`w-[55px] mr-2 p-2 rounded-lg ${DateData === '3' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('3')}>
          3년
        </button>
        <button
          className={`w-[55px] mr-2  p-2 rounded-lg ${DateData === '5' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('5')}>
          5년
        </button>
        <button
          className={`w-[55px] p-2 rounded-lg ${DateData === '100' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('100')}>
          전체
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CowPriceChart;
