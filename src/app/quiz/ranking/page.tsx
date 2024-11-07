'use client';
import Container from '@/components/common/Container';
import { useQuizRanking, useQuizTopRanking } from '@/factory/Quiz/QuizRanking';
import Image from 'next/image';
import Link from 'next/link';

const RankingPage = () => {
  const { Ranking } = useQuizRanking();
  const { data: QuizData } = useQuizTopRanking();

  return (
    <div>
      <Container>
        <div className=" flex flex-col justify-center items-center">
          <div className="text-2xl font-bold  mt-5 mb-7 ">나의 경제지식은?</div>

          <div className=" flex flex-col justify-center items-center mb-[20px]">
            {QuizData?.nickname && (
              <div className=" text-4xl  font-bold mb-5">
                {QuizData?.nickname}님의 점수는
              </div>
            )}

            <div className=" text-2xl font-bold">
              {/* 점수  api*/} <span className=" text-violet-600">{QuizData?.score}</span>
              / 100점
            </div>
            <div className="mt-2 mb-2">걸린 시간 {QuizData?.time?.substring(3)}</div>

            {/* 여기만 끝내면 됨 */}
            <div>
              오답수 {QuizData?.fail}개(
              {(QuizData?.score as number) - (QuizData?.plus as number)}
              점) + 가점(
              {QuizData?.plus}점)
            </div>
          </div>

          <div className="text-4xl font-bold mb-10 ">
            전체 평균
            <span className=" text-violet-600 ml-2">
              {Math.round(QuizData?.avag as number)}점
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className=" flex justify-between font-bold md:w-[450px] desk:w-[300px] mb-5  ">
              <div>순위</div>
              <div className="w-[90px] flex justify-center">닉네임</div>
              <div className="mr-2">점수</div>
              <div>걸린 시간</div>
            </div>

            <div className=" md:w-[450px]   desk:w-[300px] flex flex-col justify-between font-bold  ">
              {Ranking?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={` px-2 h-[36px] flex justify-between items-center mt-[20px] ${QuizData?.nickname === item.name ? ' bg-violet-300 ' : null}`}>
                    <div
                      className={`${index < 5 ? ' text-violet-600  ' : null} flex justify-center`}
                      style={{ minWidth: '24px', textAlign: 'center' }}>
                      {index < 5 ? `${index + 1}위` : index + 1}
                    </div>
                    <div
                      className="w-[90px] h-[24px] text-center overflow-hidden whitespace-nowrap text-ellipsis "
                      style={{
                        textOverflow: 'ellipsis'
                      }}>
                      {item.name}
                    </div>
                    <div>{item.score}</div>
                    <div>{item.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <Link href="/">
            <div className=" mt-7 mb-7 w-[150px] h-[30px] rounded-[8px] bg-violet-600 text-white flex justify-center items-center text-lg ">
              홈으로 이동
              <Image
                src="/images/quiz/CaretRight.svg"
                alt="arrow"
                width={20}
                height={20}
              />
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default RankingPage;
