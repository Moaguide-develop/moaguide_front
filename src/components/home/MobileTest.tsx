import { Router } from 'express';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const MobileTest = () => {
  const router = useRouter();
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
          router.push('/quiz/ranking');
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
              순위 확인하기
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
