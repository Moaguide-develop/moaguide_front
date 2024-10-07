import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
interface NearSubway {
  station: string;
  route: string;
  distance: number;
  time: number;
}

interface PublicTransportData {
  type: { type: string }[];
  cbd: string;
  cbdDistance: string;
  cbdCar: string;
  cbdSubway: string;
  gbd: string;
  gbdDistance: string;
  gbdCar: string;
  gbdSubway: string;
  ybd: string;
  ybdDistance: string;
  ybdCar: string;
  ybdSubway: string;
  nearSubway: NearSubway[];
  busLine: number;
  busNode: number;
}

const stationImageMap: { [key: string]: string } = {
  '1호선': '/images/product/detail/subway1.svg',
  '2호선': '/images/product/detail/subway2.svg',
  '3호선': '/images/product/detail/subway3.svg',
  '4호선': '/images/product/detail/subway4.svg',
  '5호선': '/images/product/detail/subway5.svg',
  '6호선': '/images/product/detail/subway6.svg',
  '7호선': '/images/product/detail/subway7.svg',
  '8호선': '/images/product/detail/subway8.svg',
  '9호선': '/images/product/detail/subway9.svg',
  분당선: '/images/product/detail/subwaybundang.svg',
  경의중앙선: '/images/product/detail/subwaygyeonghye.svg'
};

const PublicTransport = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  const fetchData = async () => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/building/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery<PublicTransportData>({
    queryKey: ['PublicTransport'],
    queryFn: fetchData
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="text-gray-400 mb-[10px]"> 주요 업무 지구</div>

      <div className="bg-gray-50 rounded-xl flex flex-col  desk:pl-[10px] md:pl-[50px] ">
        <div className="grid grid-cols-4 gap-x-4 mb-[40px] mt-[20px] text-center">
          <div className="text-gray-500 text-left"></div>
          <div className="text-gray-500">가까운 역까지</div>
          <div className="text-gray-500">차량으로</div>
          <div className="text-gray-500">대중교통으로</div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 mb-[40px]">
          <div className="text-base">{data?.cbd}(도심권역)</div>
          <div className="text-blue-500 text-center">{data?.cbdDistance}</div>
          <div className="text-blue-500 text-center">{data?.cbdCar}</div>
          <div className="text-blue-500 text-center">{data?.cbdSubway}</div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 mb-[40px]">
          <div className="text-base">{data?.gbd}(강남권역)</div>
          <div className="text-blue-500 text-center">{data?.gbdDistance}</div>
          <div className="text-blue-500 text-center">{data?.gbdCar}</div>
          <div className="text-blue-500 text-center">{data?.gbdSubway}</div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 mb-[40px]">
          <div className="text-base">{data?.ybd}(여의도권역)</div>
          <div className="text-blue-500 text-center">{data?.ybdDistance}</div>
          <div className="text-blue-500 text-center">{data?.ybdCar}</div>
          <div className="text-blue-500 text-center">{data?.ybdSubway}</div>
        </div>
      </div>

      <div className="text-gray-400 mb-[10px]">0.5km 이내 대중교통</div>

      <div className="flex max-w-[1000px] w-full mx-auto h-auto">
        <div className="bg-gray-50 rounded-xl mr-[20px] flex flex-col w-[calc(50%-10px)] p-[20px] ">
          <div className="text-base font-bold">주변 지하철</div>
          {data?.nearSubway.map((subway, index) => (
            <div key={index} className="flex justify-between mt-2">
              <div className="flex items-center">
                <div className="mr-1">
                  <Image
                    src={stationImageMap[subway.route]}
                    alt={`이미지`}
                    width={20}
                    height={20}
                  />
                </div>
                <div>{subway.route}</div>
              </div>
              <div className="flex">
                <div className="mr-[30px]">{subway.distance}m</div>
                <div>{subway.time}분</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl w-[calc(50%-10px)] p-[20px]">
          <div className="text-base font-bold">주변 버스정류장</div>
          <div className="flex justify-between mt-2">
            <div>정류장이름</div>
          </div>
          <div className="flex">
            <div className="mr-[20px] bg-gray-300  rounded-md  w-full max-w-[30px] flex justify-center items-center ">
              {data?.busLine}
            </div>
            <div className=" bg-gray-300  rounded-md w-full  max-w-[30px] flex justify-center items-center">
              {data?.busNode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicTransport;
