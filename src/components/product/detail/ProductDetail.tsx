import CommercialRentChart from './CommercialRentChart';
import CommercialVacancyRateChart from './CommercialVacancyRateChart';
import FloatingPopulationChart from './FloatingPopulationChart';
import PopulationInformationChart from './PopulationInformationChart';
import PublicTransport from './PublicTransport';
const ProductDetail = ({ url }: { url: string }) => {
  console.log(url);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className=" text-lg font-bold mb-[20px]">상권 임대료</div>
      <CommercialRentChart />

      <div className=" text-lg font-bold mb-[20px]">상권 공실률</div>
      <CommercialVacancyRateChart />
      <div className=" text-lg font-bold mb-[20px]">접근성</div>
      <PublicTransport />

      <div className=" text-lg font-bold mb-[20px]">유동인구</div>
      <FloatingPopulationChart />

      <div className=" text-lg font-bold mb-[20px]">인구정보</div>
      <PopulationInformationChart />
    </div>
  );
};

export default ProductDetail;
