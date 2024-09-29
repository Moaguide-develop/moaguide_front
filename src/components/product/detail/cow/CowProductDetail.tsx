import CowPriceChart from './CowPriceChart';

const CowProductDetail = ({ url }: { url: string }) => {
  console.log(url);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className=" text-lg font-bold mb-[20px]">한우 가격</div>
      <CowPriceChart />
    </div>
  );
};

export default CowProductDetail;
