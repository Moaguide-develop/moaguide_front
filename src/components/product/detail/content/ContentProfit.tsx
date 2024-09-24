'use client';
import { getArtProductProfitDetail } from '@/factory/ProductProfitDetail/ArtProductProfitDetail';

const ContentProfit = ({
  url,
  invest,
  genre
}: {
  url: string;
  invest: boolean;
  genre: string;
}) => {
  const { data, isLoading } = getArtProductProfitDetail(url);
  console.log(data);
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      <div>
        <div className="text-base font-bold  mb-[15px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px] ">작품명</div>
            <div className="">{data?.artPublish?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">장르</div>
            <div className="">{data?.artPublish.type}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권종류</div>
            <div className="">{data?.artPublish.authorName}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최소모집목표금액</div>
            <div className="">{data?.artPublish.basePrice.toLocaleString()}주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최대모집목표금액</div>
            <div className="">
              {Number(data?.artPublish.totalPrice).toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최소 모집수량</div>
            <div className="">{data?.artPublish.totalPrice.toLocaleString()}원</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">1주당 가격</div>
            <div className="">{data?.artPublish.issuanceDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">최소투자금액</div>
            <div className="">{data?.artPublish.issuanceDate}</div>
          </div>
        </div>

        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권발행일</div>
            <div className="">{data?.artPublish.issuanceDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  w-[400px]">
            <div className="text-gray-400  w-[150px]">증권만기일</div>
            <div className="">{data?.artPublish.issuanceDate}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      {invest ? (
        <div>
          <div className="text-base font-bold  mb-[15px] ">투자정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px] ">총예산규모</div>
              <div className="">{data?.artAuthor.name}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">객단가</div>
              <div className="">{data?.artAuthor.nationality}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">손익배당비율</div>
              <div className="">{data?.artAuthor.birth}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">추정 손익분기점</div>
              <div className="">{data?.artAuthor.academicAbility}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">제작비</div>
              <div className="">{data?.artAuthor.awardCareer}</div>
            </div>
          </div>
        </div>
      ) : null}

      {genre === 'MOVIE' ? (
        <div>
          <div className="text-base font-bold  mb-[15px] ">영화정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px] ">영화 소개</div>
              <div className="">{data?.artWork.name}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">장르</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">개봉일</div>
              <div className="">{data?.artWork.productionDate}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">등급분류</div>
              <div className="">{data?.artWork.material}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">상영시간</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">제작상태</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">감독</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">배급사</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">원작정보</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>
        </div>
      ) : genre === 'CULTURE' ? (
        <div>
          <div className="text-base font-bold  mb-[15px] ">공연정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px] ">공연 장소</div>
              <div className="">{data?.artWork.name}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">공연 기간</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">감독</div>
              <div className="">{data?.artWork.productionDate}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">공연 횟수</div>
              <div className="">{data?.artWork.material}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">프로듀서</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="">{data?.artWork.detail}</div>
            </div>
          </div>
        </div>
      ) : genre === 'EXHIBITION' ? (
        <div>
          <div className="text-base font-bold  mb-[15px] ">전시 정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px] ">전시 장소</div>
              <div className="">{data?.artWork.name}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">공연 기간</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-base font-bold  mb-[15px] ">드라마 정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px] ">감독</div>
              <div className="">{data?.artWork.name}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">제작사</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">상영채널</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  w-[400px]">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="">{data?.artWork.size}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentProfit;
