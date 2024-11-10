import { axiosInstance } from '@/service/axiosInstance';
import { useAuthStore } from '@/store/userAuth.store';
import { useQuery } from '@tanstack/react-query';
import { Router } from 'express';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
const MobileTest = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.post('/quiz/confirm');

      alert('시험 응시 후 이용 가능합니다.');
      router.push('/quiz/start');
    } catch (error) {
      router.push('/quiz/finish');
    }
  };

  return (
    <div className="flex gap-[5px] md:hidden desk:flex justify-center mt-6">
      <div
        className="w-[220px] desk:h-[60px] desk1:h-[95px] pr-4  bg-[#6e35e8] rounded-[12px] desk:gap-[3px] desk1:gap-[5px] flex
        items-center justify-center cursor-pointer
        "
        onClick={() => {
          router.push('/quiz/start');
        }}>
        <Image
          src="/images/quiz/Test.svg"
          alt="arrow"
          width={42}
          height={47}
          className="desk:w-[32px] desk:h-[39px] desk1:w-[52px] desk1:h-[57px]"
        />
        <div className="flex flex-col  ">
          <div className=" text-white desk:text-xs desk1:text-base mb-1">
            투자지식 능력고사
          </div>
          <div className="flex">
            <div className=" text-white desk:text-xs desk1:text-base mr-3">
              시험보러 가기
            </div>

            <Image
              src="/images/quiz/RightArrow.svg"
              alt="arrow"
              width={25}
              height={15}
              className="desk:w-[20px] desk1:w-[25px]"
            />
          </div>
        </div>
      </div>

      <div
        className="w-[220px] desk:h-[60px] desk1:h-[95px] pr-4  bg-[#6e35e8] rounded-[12px] desk:gap-[3px] desk1:gap-[5px] flex
        items-center justify-center cursor-pointer
        "
        onClick={() => {
          if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            router.push('/sign');
            return;
          }
          fetchQuiz();
        }}>
        <Image
          src="/images/quiz/Rank.svg"
          alt="arrow"
          width={42}
          height={47}
          className="desk:w-[32px] desk:h-[39px] desk1:w-[52px] desk1:h-[57px]"
        />
        <div className="flex flex-col  ">
          <div className=" text-white desk:text-xs desk1:text-base mb-1">
            내 경제지식은 몇등?
          </div>
          <div className="flex">
            <div className=" text-white desk:text-xs desk1:text-base mr-3">
              내 점수 보기
            </div>

            <Image
              src="/images/quiz/RightArrow.svg"
              alt="arrow"
              width={25}
              height={15}
              className="desk:w-[20px] desk1:w-[25px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTest;
