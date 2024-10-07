// import CowMarketChart from './cowmarketChart';
import CowPriceChart from './CowPriceChart';
import CowMarketChart from './CowMarketChart';

const CowProductDetail = ({ url }: { url: string }) => {
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className=" text-lg font-bold mb-[20px]">한우 가격</div>
      <CowPriceChart />

      {/* <CowMarketChart /> */}
      <CowMarketChart />
    </div>
  );
};

export default CowProductDetail;
