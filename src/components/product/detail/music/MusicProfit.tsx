import CopyRightFeeChart from '../building/chart/CopyrightFeeChart';
import StockPriceChart from '../building/chart/StockPriceChart';
import { getMusicProductProfitDetail } from '@/factory/ProductProfitDetail/MusiProductProfitDetail';
import MusicCopyRightFeeChart from './chart/MusicCopyrightFee';
import MusicStockPriceChart from './chart/MusicStockPriceChart';
import BuildingStockPriceChart from '../building/chart/StockPriceChart';

const MusicProfit = ({ url }: { url: string }) => {
  const CategoryGauge = ({
    categories
  }: {
    categories: Array<{ label: string; value: number; color: string }>;
  }) => {
    const totalValue = (() => {
      let sum = 0;
      if (categories) {
        for (let i = 0; i < categories.length; i++) {
          sum += categories[i].value;
        }
      }
      return sum;
    })();
    const segments = categories?.map((item) => ({
      ...item,
      width: totalValue ? (item.value / totalValue) * 100 : 0
    }));

    const getColorClass = (color: string) => {
      switch (color) {
        case 'red':
          return 'bg-red-500';
        case 'blue':
          return 'bg-blue-500';
        case 'green':
          return 'bg-green-500';
        case 'orange':
          return 'bg-orange-500';
        case 'purple':
          return 'bg-purple-500';
        default:
          return '';
      }
    };

    return (
      <div className="w-full flex flex-col mb-4">
        <div className="w-full h-6 flex  bg-gray-300">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`h-full ${getColorClass(segment.color)}`}
              style={{
                width: `${segment.width}%`
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs mt-1  desk2:flex-row desk:flex-col">
          {segments.map((segment, index) => (
            <span
              key={index}
              className="text-sm mr-[3px]"
              style={{ color: segment.color }}>
              {segment.label}: {segment.value}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const { data, isLoading } = getMusicProductProfitDetail(url);

  const categories = [
    { label: '방송', value: data?.musicDivide.divideDto.broadcasting ?? 0, color: 'red' },
    { label: '전송', value: data?.musicDivide.divideDto.transfer ?? 0, color: 'blue' },
    {
      label: '복제',
      value: data?.musicDivide.divideDto.replication ?? 0,
      color: 'green'
    },
    {
      label: '공연',
      value: data?.musicDivide.divideDto.performance ?? 0,
      color: 'orange'
    },
    { label: '기타', value: data?.musicDivide.divideDto.etc ?? 0, color: 'purple' }
  ];
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className="text-2xl font-bold mb-[20px]">주가</div>

      <MusicStockPriceChart />
      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />
      <div>
        <div className="text-2xl font-bold  mb-[15px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">상품명</div>
            <div className="">{data?.musicPublish?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">상품유형</div>
            <div className="flex-1">{data?.musicPublish?.type}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">가수</div>
            <div className="flex-1">{data?.musicPublish?.singer}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발행수량</div>
            <div className="flex-1">{data?.musicPublish?.piece.toLocaleString()}주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발행가액</div>
            <div className="flex-1">
              {data?.musicPublish?.basePrice.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">총 모집액</div>
            <div className="flex-1">
              {data?.musicPublish?.totalPrice.toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">상장일</div>
            <div className="">{data?.musicPublish?.issuDay}</div>
          </div>
        </div>
      </div>
      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />
      <div>
        <div className="text-2xl font-bold  mb-[15px] ">곡 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400 flex w-[150px] h-[40px] ">곡소개</div>
            <div className=" flex-1 ">{data?.musicSong?.introduceSong}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">장르</div>
            <div className="flex-1 ">{data?.musicSong?.genre}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">가수</div>
            <div className="flex-1 ">{data?.musicSong?.singer}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작사</div>
            <div className="flex-1 ">{data?.musicSong?.writer}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작곡</div>
            <div className="flex-1 ">{data?.musicSong?.composing}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">공표일자</div>
            <div className="flex-1 ">{data?.musicSong?.announcementDate}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold  mt-[35px] mb-[15px] ">저작권료 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex">
            <div className="text-gray-400  w-[150px] ">최근 1주당 저작권료</div>
            <div className="flex-1 ">
              {data?.musicDivide?.lastDividend.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex">
            <div className="text-gray-400  w-[150px]">최근 저작권료 수익률</div>
            <div className="flex-1 ">{data?.musicDivide?.lastDividendRate}%</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex">
            <div>
              <div className="text-gray-400  w-[160px]">최근 저작권료 수익률</div>
              <div className="text-gray-400  w-[150px]"> 상세정보</div>
            </div>
            <div className="flex-1">
              <div className="max-w-[250px]  ">
                <CategoryGauge categories={categories} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  "></div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">저작권료 지급일</div>
            <div className="">{data?.musicDivide?.paymentDay}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">저작권료 주기</div>
            <div className="flex-1">{data?.musicDivide?.divideCycle}</div>
          </div>
        </div>
      </div>
      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />
      <div className="text-2xl font-bold  mb-[15px]  mt-[30px]  ">
        지급주기별 저작권료 & 시가배당률(%)
      </div>
      <MusicCopyRightFeeChart />
    </div>
  );
};

export default MusicProfit;
