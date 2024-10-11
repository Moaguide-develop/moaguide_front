import CommercialRentChart from './chart/CommercialRentChart';
import CommercialVacancyRateChart from './chart/CommercialVacancyRateChart';
import FloatingPopulationChart from './chart/FloatingPopulationChart';
import PopulationInformationChart from './chart/PopulationInformationChart';
import PublicTransport from './PublicTransport';
import OfficialPriceChart from './chart/OfficialPriceChart';
const BuildingProductDetail = ({
  url,
  rentType
}: {
  url: string;
  rentType: boolean | undefined;
}) => {
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
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
