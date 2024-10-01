import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
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
import { useRef, useState } from 'react';
import { ICowMarketPrice } from '@/types/CowProductType';

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
const CowMarketChart = () => {
  const [MarketfilteringData, setMarketFilteringData] = useState('cattlePopulation');
  const [MarketDateData, setDateData] = useState('1');
  const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketFilteringData(e.target.id);
  };

  const fetchData = async () => {
    const response = await axios.get<ICowMarketPrice>(
      `https://api.moaguide.com/detail/hanwoo/sub/hanwoomarket?category=${MarketfilteringData}&month=${MarketDateData}`
    );
    return response.data;
  };

  const {
    data: HanwooMarketData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['HanwooMarketChart', MarketfilteringData, MarketDateData],
    queryFn: fetchData
  });

  const MarketchartRef = useRef(null);

  const HanWooMarketDate = HanwooMarketData?.object.map((item) => item.day) || [];

  const HanwooMarketCount = HanwooMarketData?.object.map((item) => item.value) || [];
  const sortedHanwooMarketCount = [...HanwooMarketCount].sort((a, b) => b - a);
  const maxHanwooMarketCount = sortedHanwooMarketCount[0] || 0;
  const averageHanwooMarketCount =
    HanwooMarketCount.reduce((acc, val) => acc + val, 0) / HanwooMarketCount.length || 0;
  const newVariable = Math.floor(maxHanwooMarketCount + averageHanwooMarketCount);

  const dataSets = {
    labels: HanWooMarketDate,
    data: HanwooMarketCount
  };

  const data = {
    labels: dataSets.labels,
    datasets: [
      {
        label: '한우 가격',
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
          id="cattlePopulation"
          className=" mr-[5px] cursor-pointer"
          checked={MarketfilteringData == 'cattlePopulation'}
          onChange={handleFiltering}
        />
        <label htmlFor="cattlePopulation" className="mr-[10px]">
          한우 사육두수
        </label>
        <input
          type="radio"
          id="cattleSale"
          className=" mr-[5px] cursor-pointer"
          checked={MarketfilteringData == 'cattleSale'}
          onChange={handleFiltering}
        />
        <label htmlFor="cattleSale" className="mr-[10px]">
          연각 매각 두수
        </label>
        <input
          type="radio"
          id="cattleFarm"
          className=" mr-[5px] cursor-pointer"
          checked={MarketfilteringData == 'cattleFarm'}
          onChange={handleFiltering}
        />
        <label htmlFor="cattleFarm" className="mr-[10px]">
          한우 사육농가수
        </label>
        <input
          type="radio"
          id="cattleTransaction"
          className=" mr-[5px] cursor-pointer"
          checked={MarketfilteringData == 'cattleTransaction'}
          onChange={handleFiltering}
        />
        <label htmlFor="cattleTransaction" className="mr-[10px]">
          한우 거래정육량
        </label>
      </section>
      <div className=" flex justify-end">
        <button
          className={`w-[55px] mr-2 p-2  rounded-lg ${MarketDateData === '1' ? 'bg-purple-500 text-white' : 'bg-gray-300  '}`}
          onClick={() => setDateData('1')}>
          1년
        </button>
        <button
          className={`w-[55px] mr-2 p-2 rounded-lg ${MarketDateData === '3' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('3')}>
          3년
        </button>
        <button
          className={`w-[55px] mr-2  p-2 rounded-lg ${MarketDateData === '5' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('5')}>
          5년
        </button>
        <button
          className={`w-[55px] p-2 rounded-lg ${MarketDateData === '100' ? 'bg-purple-500 text-white' : 'bg-gray-300 '}`}
          onClick={() => setDateData('100')}>
          전체
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 mb-[100px]">
        <div className="w-full max-w-4xl h-[400px]">
          <Line ref={MarketchartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CowMarketChart;
