import CommercialRentChart from './chart/CommercialRentChart';
import CommercialVacancyRateChart from './chart/CommercialVacancyRateChart';
import FloatingPopulationChart from './chart/FloatingPopulationChart';
import PopulationInformationChart from './chart/PopulationInformationChart';
import PublicTransport from './PublicTransport';
import OfficialPriceChart from './chart/OfficialPriceChart';
import AccommodationVisitorsChart from './chart/AccommodationVisitorsChart';
import AccommoationRateChart from './chart/AccommodationRateChart';
const BuildingProductDetail = ({
  url,
  rentType,
  stayType
}: {
  url: string;
  rentType: boolean | undefined;
  stayType: boolean | undefined;
}) => {
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      {stayType ? (
        <>
          <div>
            <span className=" text-2xl font-bold mb-[20px]">숙박 유형별 방문자 수</span>
          </div>

          <AccommodationVisitorsChart />
          <div>
            <span className=" text-2xl font-bold mb-[20px]">
              숙박 방문자 비율 / 평균 숙박일
            </span>
          </div>
          <AccommoationRateChart />
        </>
      ) : (
        <>
          <div>
            <span className=" text-2xl font-bold mb-[20px]"> 상권 임대료 </span>
            <span className="text-lg ml-4 text-red-500"> (단위: 천원/m&sup2;)</span>
          </div>
          <CommercialRentChart rentType={rentType} />
          <div>
            <span className=" text-2xl font-bold mb-[20px]">상권 공실률</span>
            <span className="text-lg ml-4 text-red-500"> (단위: %)</span>
          </div>
          <CommercialVacancyRateChart rentType={rentType} />
        </>
      )}

      <div>
        <span className=" text-2xl font-bold mb-[20px]">공시지가</span>
        <span className="text-lg ml-4 text-red-500"> (단위: 원/m&sup2;)</span>
      </div>

      <OfficialPriceChart />
      <div className=" text-2xl font-bold mb-[20px]">접근성</div>
      <PublicTransport />

      <div className=" text-2xl font-bold mb-[40px] mt-[50px]">유동인구</div>
      <FloatingPopulationChart />

      <div className=" text-2xl font-bold mb-[20px]">인구정보</div>
      <PopulationInformationChart />
    </div>
  );
};

export default BuildingProductDetail;
