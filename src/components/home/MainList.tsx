import React, { useState } from 'react';
import MainListItem from './MainListItem';
import { useRouter } from 'next/navigation';
import { getMainProduct, getMainProductLogin } from '@/factory/MainProduct';
import MainListItemSkeleton from '../skeleton/MainListItemSkeleton';
import { useAuthStore } from '@/store/userAuth.store';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useHomeQuizRanking } from '@/factory/Quiz/HomeQuizRanking';
import { axiosInstance } from '@/service/axiosInstance';

const MainList = () => {
  const [category, setCategory] = useState('all');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.post('/quiz/confirm');

      alert('시험 응시 후 이용 가능합니다.');
      router.push('/quiz/ranking');
    } catch (error) {
      router.push('/quiz/finish');
    }
  };
  const { data, isLoading } = isLoggedIn
    ? getMainProductLogin(category)
    : getMainProduct(category);

  const { Ranking } = useHomeQuizRanking();
  const handleBookmarkInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['MainProductLogin', category] });
  };

  return (
    <div className="flex">
      <div className=" flex-1 max-w-[692px] w-full">
        <div className="flex items-center justify-between">
          <div className="text-heading4">주요 상품 현황</div>
          <div
            onClick={() => {
              router.push('/product');
            }}
            className="cursor-pointer">
            <img src="/images/home/item_right.svg" alt="상품 보기" />
          </div>
        </div>
        <div className="mt-5 sm:mt-8 flex items-center gap-5 border-b border-gray100 text-mobileTitle sm:text-title2 overflow-x-auto whitespace-nowrap">
          <div
            onClick={() => setCategory('all')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'all' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            전체
          </div>
          <div
            onClick={() => setCategory('building')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'building' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            부동산
          </div>
          <div
            onClick={() => setCategory('music')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'music' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            음악저작권
          </div>
          <div
            onClick={() => setCategory('cow')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'cow' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            한우
          </div>
          <div
            onClick={() => setCategory('art')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'art' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            미술품
          </div>
          <div
            onClick={() => setCategory('content')}
            className={`pb-3 sm:pb-5 cursor-pointer ${category === 'content' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}>
            콘텐츠
          </div>
        </div>
        <div className="">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <MainListItemSkeleton key={i} />)
            : data?.map((item, i) => (
                <MainListItem
                  currentTab={category}
                  key={i}
                  {...item}
                  handleBookmarkInvalidate={handleBookmarkInvalidate}
                />
              ))}
        </div>
      </div>
      {/* <div className="w-[280px] h-[257px] ml-5  desk:hidden md:block">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold ">시험순위</div>
          <div
            className="flex items-center mr-2 cursor-pointer"
            onClick={() => {
              if (!isLoggedIn) {
                alert('로그인이 필요한 서비스입니다.');
                router.push('/sign');
                return;
              }
              fetchQuiz();
            }}>
            <div className="text-gray-500 mr-2">내 점수 보기</div>{' '}
            <Image
              src={'/images/home/item_right.svg'}
              alt="image"
              width={18}
              height={18}
              // className="mb-1"
            />
          </div>
        </div>

        <div className="h-[215px]  shadow-md shadow-slate-200 p-5 rounded-[8px]">
          <div className="flex flex-col font-bold">
            {Ranking?.map((item, i) => (
              <div key={i} className="flex mb-4">
                <div className={`${i + 1 < 4 ? 'text-violet-600' : null}  mr-5`}>
                  {i + 1}위
                </div>
                <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis ">
                  {item.name}
                </div>
                <div className=" ">{item.score}점</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainList;
