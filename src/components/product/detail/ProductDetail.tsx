import CommercialRentChart from './CommercialRentChart';
import CommercialVacancyRateChart from './CommercialVacancyRateChart';
import FloatingPopulationChart from './FloatingPopulationChart';
import PopulationInformationChart from './PopulationInformationChart';

const ProductDetail = () => {
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
