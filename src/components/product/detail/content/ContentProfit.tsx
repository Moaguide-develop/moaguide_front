'use client';
import { getContentProductProfitDetail } from '@/factory/ProductProfitDetail/ContentProductProfitDetail';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetContentMoviePeopleData } from '@/factory/ContentMoviePeople';
import {
  IContentActorStats,
  IContentProductContentActor
} from '@/types/ContentProductType';
import Image from 'next/image';
import { InvalidateQueryFilters } from '@tanstack/react-query';
interface MoviePeopleLayoutProps {
  data: IContentProductContentActor | undefined;
}
const ContentProfit = ({
  url,
  invest,
  genre
}: {
  url: string;
  invest: boolean;
  genre: string;
}) => {
  const [moviePeople, setMoviePeople] = useState('');
  const { ContentMoviePeopleData } = GetContentMoviePeopleData(moviePeople);
  const queryClient = useQueryClient();
  const { data, isLoading } = getContentProductProfitDetail(url, genre);

  const [isModal, setIsModal] = useState(false);
  return (
    <div
      className="max-w-[1000px] mx-auto mt-[32px]"
      onClick={() => {
        if (isModal) {
          setIsModal(false);
        }
      }}>
      <div>
        <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">발행 정보</div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px] ">작품명</div>
            <div className="flex-1">{data?.base.publish?.name}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">장르</div>
            <div className="flex-1">{data?.base.publish.genre}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">증권종류</div>
            <div className="flex-1">{data?.base.publish.type}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">최소모집목표금액</div>
            <div className="flex-1">
              {data?.base.publish.minAmount.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">최대모집목표금액</div>
            <div className="flex-1">
              {Number(data?.base.publish.maxAmount).toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">최소 모집수량</div>
            <div className="flex-1">{data?.base.publish.piece.toLocaleString()}주</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">1주당 가격</div>
            <div className="flex-1">
              {data?.base.publish.basePrice.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">최소투자금액</div>
            <div className="flex-1">
              {data?.base.publish.minInvestment.toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">증권발행일</div>
            <div className="flex-1">{data?.base.publish.issuanceDate}</div>
          </div>
        </div>
        <div className="flex flex-col  mb-[7px]">
          <div className=" flex  ">
            <div className="text-gray-400  w-[150px]">증권만기일</div>
            <div className="flex-1">{data?.base.publish.expirationDate}</div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] my-[40px] bg-gray-200" />

      {invest ? (
        <div>
          <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">투자정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px] ">총예산규모</div>
              <div className="flex-1">
                {data?.base?.investment.totalBudget ? (
                  <div>{data?.base?.investment?.totalBudget?.toLocaleString()}원</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">객단가</div>
              <div className="flex-1">
                {data?.base?.investment?.unitPrice && (
                  <div>{data?.base?.investment?.unitPrice?.toLocaleString()}원</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">손익배당비율</div>
              <div className="flex-1">{data?.base.investment.profitRatio}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">추정 손익분기점</div>
              <div className="flex-1">{data?.base.investment.breakEvenPoint}</div>
            </div>
          </div>
        </div>
      ) : null}

      {genre === 'MOVIE' ? (
        <div>
          <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">영화정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400   w-[150px] ">영화 소개</div>
              <div className="flex-1">{data?.object?.movieInfo}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">장르</div>
              <div className="flex-1">{data?.object?.subgenre}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">개봉일</div>
              <div className="flex-1">{data?.object?.releaseDate}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">등급분류</div>
              <div className="flex-1">{data?.object?.grade}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">상영시간</div>
              <div className="flex-1">{data?.object?.runningTime}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px] relative">
            <div className=" flex ">
              {isModal ? (
                <div>
                  <MoviePeopleLayout data={ContentMoviePeopleData} />
                </div>
              ) : null}
              <div className="text-gray-400  w-[150px]">감독</div>
              <div
                className=" max-w-[150px] text-blue-500 underline cursor-pointer"
                onClick={() => {
                  setIsModal(!isModal);
                  setMoviePeople(data?.object?.director as string);
                }}>
                {data?.object?.director}
              </div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="flex-1 text-blue-500 underline cursor-pointer">
                {data?.object?.actor?.map((item) => {
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        setIsModal(!isModal);
                        setMoviePeople(item as string);
                      }}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">배급사</div>
              <div className="flex-1">{data?.object?.distributor}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">원작정보</div>
              <div className="flex-1">{data?.object?.originalInfo}</div>
            </div>
          </div>
        </div>
      ) : genre === 'CULTURE' ? (
        <div>
          <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">공연정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px] ">공연 장소</div>
              <div className="flex-1">{data?.object?.venue}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">공연 기간</div>
              <div className="flex-1">{data?.object?.period}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">감독</div>
              <div>{data?.object?.director}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">공연 횟수</div>
              <div className="flex-1">{data?.object?.showTimes}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">프로듀서</div>
              <div className="flex-1">{data?.object?.producer}</div>
            </div>
          </div>

          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="flex-1">{data?.object?.casting}</div>
            </div>
          </div>
        </div>
      ) : genre === 'EXHIBITION' ? (
        <div>
          <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">전시 정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px] ">전시 장소</div>
              <div className="flex-1">{data?.object?.place}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">공연 기간</div>
              <div className="flex-1">{data?.object?.period}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold  mb-[15px] mt-[20px] ">드라마 정보</div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px] ">감독</div>
              <div className="flex-1">{data?.object?.director}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">제작사</div>
              <div className="flex-1">{data?.object?.company}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">상영채널</div>
              <div className="flex-1">{data?.object?.channel}</div>
            </div>
          </div>
          <div className="flex flex-col  mb-[7px]">
            <div className=" flex  ">
              <div className="text-gray-400  w-[150px]">출연</div>
              <div className="flex-1">{data?.object?.cast}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentProfit;

const MoviePeopleLayout = (data: MoviePeopleLayoutProps) => {
  return (
    <div className="">
      <div className=" desk:w-full  h-[full] md:w-[1000px] md:h-[300px] bg-gray-50 absolute desk:bottom-[-120px] desk:left-0  md:bottom-[-100px] md:left-[150px] flex items-center">
        <div className="flex  desk:flex-col md:flex-row ">
          {data?.data?.map((item: IContentActorStats, index) => {
            return (
              <div key={index} className="flex desk:my-5 md:my-0 ">
                <div>
                  <Image
                    src={item.imgLink}
                    width={80}
                    height={170}
                    alt={'movieimage'}
                    className=" mx-3 object-cover "
                  />
                </div>

                <div className="flex flex-col flex-1 ">
                  <div className="text-lg font-bold">{item.movie}</div>
                  <div className="text-base text-blue-500">{item.role}</div>

                  <div className="text-sm ">{item.side}</div>
                  <div className="text-sm ">
                    [공식 통계]{item.officialMoney.toLocaleString()}원
                    {item.officialPeople.toLocaleString()}명
                  </div>
                  <div className="text-sm ">
                    [kobis 통계]{item.money.toLocaleString()}원
                    {item.people.toLocaleString()}명
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
