import CommercialRentChart from './CommercialRentChart';
import CommercialVacancyRateChart from './CommercialVacancyRateChart';
import FloatingPopulationChart from './FloatingPopulationChart';
import PopulationInformationChart from './PopulationInformationChart';

const ProductDetail = () => {
  // const MOCK = {
  //   product_Id: 'sou.8',
  //   name: '신도림 핀포인트 타워 1호',
  //   publisher: '신영부동산신탁',
  //   piece: 196000,
  //   basePrice: 5000,
  //   totalPrice: '8.42억원',
  //   subscription: '23.12.14 ~ 23.12.29',
  //   listingDate: '2024-01-09',
  //   address: '서울특별시구로구신도림동 337 ',
  //   useArea: '일반상업지역',
  //   mainUse: '업무시설',
  //   completionDate: '2007년 08월 06일',
  //   landArea: '19.51㎡ / 전체 16,529㎡',
  //   floorAreaRate: 659.98,
  //   dryRatio: 55.43,
  //   height: 102.8,
  //   scale: '지하 5층, 지상 30층',
  //   mainStructure: '철근콘크리트구조',
  //   parking: 1701,
  //   lift: 24,
  //   landElevation: '평지',
  //   landShape: '가장형',
  //   zoningNational:
  //     '도시지역,일반상업지역,지구단위계획구역,도로(접합),중로2류(폭 80m~20m)(2016-12-01)(접합)',
  //   zoningOther:
  //     '교육환경보호구역(남부교육청에 반드시 확인요망)<교육환경 보호에 관한 법률>,대공방어협조구역(위탁고도:해발165m(지반+건축+옥탑 등), 육군수도방위사령부(02-524-3146)관할)<군사기지 및 군사시설 보호법>,과밀억제권역<수도권정비계획법>',
  //   latitude: 37.509421,
  //   longitude: 126.887744,
  //   leases: [
  //     {
  //       tenant: '㈜삼성화재금융서비스',
  //       tenantIntroduction: '',
  //       leasePeriod: '2022.12.26 ~ 2024.12.25',
  //       leaseArea: 219.88,
  //       deposit: 32589000,
  //       rent: '3,258,990원',
  //       administrationCost: '1,995,300원',
  //       detailedConditions: '연 2.5%의 인상률 적용'
  //     }
  //   ]
  // };

  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className=" text-lg font-bold mb-[20px]">상권 임대료</div>
      <CommercialRentChart />

      <div className=" text-lg font-bold mb-[20px]">상권 공실률</div>
      <CommercialVacancyRateChart />
      <div className=" text-lg font-bold mb-[20px]">접근성</div>
      <div className="text-gray-400 mb-[10px]"> 주요 업무 지구</div>

      <div className=" bg-gray-50 rounded-xl flex flex-col">
        <div className="flex mb-[40px]  justify-center items-center mt-[20px]">
          <div className=" "></div>
          <div className="text-gray-200 ml-[120px]">가까운 역까지</div>
          <div className="text-gray-200 ml-[120px]">차량으로</div>
          <div className="text-gray-200 ml-[120px]">대중교통으로</div>
        </div>

        <div className="flex mb-[40px] justify-center items-center ">
          <div className="text-base">CBD(도심권역)</div>
          <div className="text-blue-500 ml-[120px]">약 80km</div>
          <div className="text-blue-500 ml-[120px]">평균 30분 소요</div>
          <div className="text-blue-500 ml-[120px]">평균 10분 소요</div>
        </div>
        <div className="flex mb-[40px]  justify-center items-center">
          <div className="text-base">CBD(도심권역)</div>
          <div className="text-blue-500 ml-[120px]">약 80km</div>
          <div className="text-blue-500 ml-[120px]">평균 30분 소요</div>
          <div className="text-blue-500 ml-[120px]">평균 10분 소요</div>
        </div>
        <div className="flex mb-[40px] justify-center items-center ">
          <div className="text-base">CBD(도심권역)</div>
          <div className="text-blue-500 ml-[120px]">약 80km</div>
          <div className="text-blue-500 ml-[120px]">평균 30분 소요</div>
          <div className="text-blue-500 ml-[120px]">평균 10분 소요</div>
        </div>
      </div>
      <div className="text-gray-400 mb-[10px]"> 0.5km 이내 대중교통</div>

      <div className="flex max-w-[1000px] w-full mx-auto  h-[120px]">
        <div className="bg-gray-50 rounded-xl mr-[20px] flex flex-col w-[calc(50%-10px)] p-[20px] ">
          <div className="text-base font-bold ">주변 지하철</div>
        </div>
        <div className="bg-gray-50 rounded-xl  w-[calc(50%-10px)]">
          <div className="text-base font-bold ">주변 버스정류장</div>
        </div>
      </div>

      <div className=" text-lg font-bold mb-[20px]">유동인구</div>
      <FloatingPopulationChart />

      <div className=" text-lg font-bold mb-[20px]">인구정보</div>
      <PopulationInformationChart />
    </div>
  );
};

export default ProductDetail;
