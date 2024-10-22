'use client';
import { getCowProductProfitDetail } from '@/factory/ProductProfitDetail/CowProductProfitDetail';

const CowProfit = ({ url }: { url: string }) => {
  const { data, isLoading } = getCowProductProfitDetail(url);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div>
        <div className="text-2xl font-bold  mb-[15px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">상품명</div>
            <div className="">{data?.publish?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권 종류</div>
            <div className="">{data?.publish?.type}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발행 증권수</div>
            <div className="">{data?.publish?.piece.toLocaleString()}주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">발행가액</div>
            <div className="">{data?.publish?.basePrice.toLocaleString()}원</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">총 모집액</div>
            <div className="">{Number(data?.publish?.totalPrice).toLocaleString()}원</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">모집방법</div>
            <div className="">{data?.publish?.recruitingType}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">권리구조</div>
            <div className="">{data?.publish?.rightsStructure}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">수익구조</div>
            <div className="">{data?.publish?.revenueStructure}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">청약공고일</div>
            <div className="">{data?.publish?.subscriptionDate}</div>
          </div>
        </div>

        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">납일기일</div>
            <div className="">{data?.publish?.paymentDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배정공고일</div>
            <div className="">{data?.publish?.allocationDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">배정기준일</div>
            <div className="">{data?.publish?.criteriaDate}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      <div>
        <div className="text-2xl font-bold  mb-[15px] ">농가정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">인증번호</div>
            <div className="">{data?.farm?.certificationNumber}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">인증기관</div>
            <div className="">{data?.farm?.certificationAgency}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">관리책임자</div>
            <div className="">{data?.farm?.manager?.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">인증 두수</div>
            <div className="">{data?.farm?.certifiedHeads.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">축종</div>
            <div className="">{data?.farm?.cattleBreed?.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최초인증일</div>
            <div className="">{data?.farm?.initialDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowProfit;
