import { getProductProfitDetail } from '@/factory/ProductProfitDetail';
import CopyRightFeeChart from './CopyrightFeeChart';
import KakaoMap from './Map';
import StockPriceChart from './StockPriceChart';
const Profit = ({ url }: { url: string }) => {
  const { data, isLoading } = getProductProfitDetail(url);
  console.log(data);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div className=" text-lg font-bold mb-[20px]">위치</div>
      <div className="desk:flex  desk:justify-center desk2:justify-start">
        <KakaoMap />
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200 " />
      <div className="text-base font-bold mb-[20px]">주가</div>
      <StockPriceChart />
      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      <div>
        <div className="text-base font-bold  mb-[15px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">공모자산</div>
            <div className="">{data?.publish.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권 종류</div>
            <div className="">{data?.publish.publisher}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최근 배당금</div>
            <div className="">{data?.publish.basePrice}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발생 증권수</div>
            <div className="">{data?.publish.last_divide}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">1주 당 발행 가액</div>
            <div className="">{data?.publish.piece}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">총 모집 액</div>
            <div className="">{data?.publish.totalPrice}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">청약 일정</div>
            <div className="">{data?.publish.subscription}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">상장일</div>
            <div className="">{data?.publish.listingDate}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      <div>
        <div className="text-base font-bold  mb-[15px] ">계약 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">임차인</div>
            <div className="">{data?.lease[0].tenant}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">임차인 소개</div>
            <div className="">{data?.lease[0].tenantIntroduction}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">임대 기간</div>
            <div className="">{data?.lease[0].leasePeriod}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">임대 면적</div>
            <div className="">{data?.lease[0].leaseArea}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">보증금</div>
            <div className="">{data?.lease[0].deposit}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">임대료</div>
            <div className="">{data?.lease[0].rent}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">관리비</div>
            <div className="">{data?.lease[0].administrationCost}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">상세 계약조건 및 비고</div>
            <div className="">{data?.lease[0].detailedConditions}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />
      <div>
        <div className="text-base font-bold  mb-[15px] ">건물 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">상품명</div>
            {/* <div className="">{data?.buildingDetail.productId.name}</div> */}
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">위치</div>

            <div className="">{data?.buildingDetail.location}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">용도 지역</div>
            <div className="">{data?.buildingDetail.mainUse}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">주용도</div>
            <div className="">{data?.buildingDetail.mainUse}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">준공일</div>
            <div className="">{data?.buildingDetail.completionDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">대지면적</div>
            <div className="">{data?.buildingDetail.floorArea}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">용적률</div>
            <div className="">{data?.buildingDetail.floorAreaRate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">건폐율</div>
            <div className="">{data?.buildingDetail.dryRatio}</div>
          </div>
        </div>

        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">건물 높이</div>
            <div className="">{data?.buildingDetail.height}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">건물 규모</div>
            <div className="">{data?.buildingDetail.scale}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">주구조</div>
            <div className="">{data?.buildingDetail.mainStructure}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">주차대수</div>
            <div className="">{data?.buildingDetail.parking}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">승강기</div>
            <div className="">{data?.buildingDetail.lift}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-base font-bold  mb-[15px]  mt-[30px] ">토지 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">지형높이</div>
            <div className="">{data?.landRegistry.landElevation}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">지형 형성</div>
            <div className="">{data?.landRegistry.landShape}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">도로집면</div>
            <div className="">{data?.landRegistry.roadInterface}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-full max-w-[900px] desk:h-[100px] desk2:h-[100px]">
            <div className="text-gray-400  desk2:w-[150px]  desk:w-[300px] ">
              지역지구 등 지정여부 (국토의 계획 및 이용에 관한 법률)
            </div>
            <div className=" ">{data?.landRegistry.zoningNational}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-full max-w-[900px] desk:h-[150px] desk2:h-[100px]">
            <div className="text-gray-400  desk2:w-[200px]  desk:w-[500px]">
              지역지구 등 지정여부 (기타법률)
            </div>
            <div className="">{data?.landRegistry.zoningOther}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-base font-bold  mb-[15px] mt-[30px] ">배당금 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">최근 배당금</div>
            <div className="">null</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배당 주기</div>
            <div className="">null</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배당 기준일</div>
            <div className="">null</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배당 지급일</div>
            <div className="">null</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배당 수익률</div>
            <div className="">null</div>
          </div>
        </div>
      </div>

      <div className="text-base font-bold  mb-[15px]  mt-[30px]  ">
        배당주기별 배당금 & 시가배당률
      </div>
      <CopyRightFeeChart />
    </div>
  );
};

export default Profit;
