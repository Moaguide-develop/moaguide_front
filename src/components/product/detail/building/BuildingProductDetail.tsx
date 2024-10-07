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
      <div className=" text-2xl font-bold mb-[20px]">상권 임대료</div>
      <CommercialRentChart rentType={rentType} />

      <div className=" text-2xl font-bold mb-[20px]">상권 공실률</div>
      <CommercialVacancyRateChart rentType={rentType} />

      <div className=" text-2xl font-bold mb-[20px]">공시지가</div>
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
