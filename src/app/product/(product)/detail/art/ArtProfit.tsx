'use client';
import { getArtProductProfitDetail } from '@/factory/Product/ProductProfitDetail/ArtProductProfitDetail';

const ArtProfit = ({ url }: { url: string }) => {
  const { data, isLoading } = getArtProductProfitDetail(url);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div>
        <div className="text-2xl font-bold  mb-[15px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px] ">작품명</div>
            <div className="flex-1">{data?.artPublish?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">증권유형</div>
            <div className="flex-1">{data?.artPublish?.type}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작가</div>
            <div className="flex-1">{data?.artPublish?.authorName}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">발행수량</div>
            <div className="flex-1">{data?.artPublish?.basePrice.toLocaleString()}주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">발행가액</div>
            <div className="flex-1">
              {Number(data?.artPublish?.totalPrice).toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">총 모집액</div>
            <div className="flex-1">
              {Number(data?.artPublish?.totalPrice).toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">상장일</div>
            <div className="flex-1">{data?.artPublish?.issuanceDate}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      <div>
        <div className="text-2xl font-bold  mb-[15px] ">작가정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px] ">이름</div>
            <div className="flex-1">{data?.artAuthor?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">국적</div>
            <div className="flex-1">{data?.artAuthor?.nationality}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">태생년도</div>
            <div className="flex-1">{data?.artAuthor?.birth}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">학력</div>
            <div className="flex-1">{data?.artAuthor?.academicAbility}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">수상경력</div>
            <div className="flex-1">{data?.artAuthor?.awardCareer}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">대표작</div>
            <div className="flex-1">{data?.artAuthor?.major}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작가활동, 소개</div>
            <div className="flex-1">{data?.artAuthor?.introduction}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">작품정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px] ">작품명</div>
            <div className="flex-1">{data?.artWork?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작품크기(가로x세로)</div>
            <div className="flex-1">{data?.artWork?.size}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">제작년도</div>
            <div className="flex-1">{data?.artWork?.productionDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">재료</div>
            <div className="flex-1">{data?.artWork?.material}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">작품정보</div>
            <div className="flex-1">{data?.artWork?.detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtProfit;
