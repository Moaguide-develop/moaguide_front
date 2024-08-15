const Profit = () => {
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
  //     '도시지역,일반상업지역,지구단위계획구역,도로(접합),중로2류(폭 15m~20m)(2016-12-01)(접합)',
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
      <div className=" text-lg font-bold">위치</div>
      <div className=" w-full h-[1px] bg-gray-200" />
      <div className="text-base font-bold">주가</div>
      <div className=" w-full h-[1px] bg-gray-200" />

      <div>
        <div className="text-base font-bold ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">공모자산</div>
            <div className="">압구정 커머스 빌딩</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권 종류</div>
            <div className="">00 증권</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최근 배당금</div>
            <div className="">한국 토지신탁</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발생 증권수</div>
            <div className="">1,000,000주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">1주 당 발행 가액</div>
            <div className="">1,000원</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">총 모집 액</div>
            <div className="">00,000,000,000원</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">청약 일정</div>
            <div className="">2024.06.06 ~ 2024.06.07</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">상장일</div>
            <div className="">2024년8월12일</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] bg-gray-200" />
      <div>
        <div className="text-base font-bold">계약 정보</div>
      </div>

      <div className=" w-full h-[1px] bg-gray-200" />
      <div className="text-base font-bold">건물 정보</div>

      <div className="text-base font-bold">토지 정보</div>

      <div className="text-base font-bold">배당금 정보</div>
    </div>
  );
};

export default Profit;
