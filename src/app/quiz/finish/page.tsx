'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMemberStore } from '@/store/user.store';
import Image from 'next/image';
import QuizSkeleton from '@/components/skeleton/QuizSkeleton';
import { useAuthStore } from '@/store/userAuth.store';
import { ScoreData } from '@/types/Quiz';
import { useQuizScore } from '@/factory/Quiz/QuizScore';

const QuizFinishPage: React.FC = () => {
  const router = useRouter();
  const { member } = useMemberStore();
  const { isLoggedIn } = useAuthStore();
  const alertShownRef = useRef(false);

  const { data, isLoading: isQuizLoading, isError } = useQuizScore();
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    // 클라이언트 측에서만 sessionStorage를 사용하도록 설정
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('insta');
      sessionStorage.removeItem('email');
    }
  }, []);

  const scoreData: ScoreData | null = data
    ? {
        score: data.score,
        faillist: data.failList,
        failanswer: JSON.parse(data.failanswer),
        plus: data.plus,
        time: data.time,
      }
    : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !alertShownRef.current) {
      alertShownRef.current = true;
      alert('로그인이 필요한 서비스입니다.');
      router.push('/sign');
      return;
    }

    if (isError) {
      alert('점수를 불러오는데 실패했습니다.');
      router.push('/');
    }
  }, [isLoggedIn, isError, router]);

  if (isLoading || isQuizLoading) {
    return <QuizSkeleton />;
  }

  if (!scoreData) return null;

  const { score, faillist, failanswer, plus, time } = scoreData;

  const formatElapsedTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes}분 ${seconds}초`;
  };

  const elapsedTime = formatElapsedTime(time);
  const calculatedScore = Math.max(90 - faillist.length * 3, 0);

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] text-center sm:mb-0 w-[90%] mx-auto sm:max-w-[640px] justify-between sm:justify-start">
      <div>
        <h2 className="text-2xl font-bold mb-4">🎉 고생하셨습니다 🎉</h2>
        <p className="text-4xl font-extrabold mb-2">{member.memberNickName}님의 점수는</p>
        <p className="text-4xl font-extrabold mb-2">
          <span className="text-[#5B11F7]">{score}점</span> / 100점
        </p>
        <p className="text-base text-gray-500 mt-2">걸린 시간: {elapsedTime}</p>
        <p className="text-base text-gray-500 mt-2">
          정답수 {30 - faillist.length}개 ({calculatedScore}점) + 가점 ({plus}점)
        </p>
      </div>
      
      <div className="flex flex-col mx-auto items-center justify-center space-y-4 mt-12 w-full max-w-[330px] mb-4 sm:mb-2">
        <button
          onClick={() => router.push('/quiz/ranking')}
          className="w-full h-[50px] py-3 rounded-[12px] text-lg font-bold bg-gradient2 text-heading4 text-white text-center"
        >
          내 순위 확인하기
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full h-[50px] py-3 rounded-[12px] text-lg font-bold bg-gradient2 text-heading4 text-white text-center"
        >
          홈으로 이동
        </button>
      </div>

      {calculatedScore === 90 ? (
        <div className="flex flex-col items-center justify-center text-center mt-0 flex-grow sm:flex-grow-0 sm:mt-8">
          <p className="text-2xl font-bold text-black">축하합니다!<br />모든 문제를 다 맞추셨습니다!</p>
        </div>
      ) : (
        <>
          <div className="min-w-0 max-w-[330px] h-[50px] w-[90%] py-3 my-4 items-center mx-auto text-center rounded-[12px] text-lg font-semibold bg-gray-200 text-black">
            내가 틀린 문제
          </div>
          <div className="mt-6 space-y-8 max-w-[600px] mx-auto">
            {faillist.map((fail, index) => (
              <div
                key={index}
                className={`text-left mb-6 ${index !== faillist.length - 1 ? 'border-b border-gray-300 pb-6' : ''}`}
              >
                <p className="text-xl font-semibold mb-4">{fail.explanation}</p>
                <div>
                  {[fail.choice1, fail.choice2, fail.choice3, fail.choice4, fail.choice5].map((choice, i) => (
                    <div
                      key={i}
                      className={`flex items-center p-2 rounded ${failanswer[index] === i + 1 ? 'bg-red-200' : ''}`}
                    >
                      <img
                        src={failanswer[index] === i + 1 ? '/sign/Checked.svg' : '/sign/Check.svg'}
                        alt="Check icon"
                        className="w-5 h-5 mr-2"
                      />
                      {choice}
                    </div>
                  ))}
                </div>
                <a
                  href={fail.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center mt-4 w-[200px] py-3 rounded-[12px] text-[14px] font-semibold bg-gradient2 text-white text-center space-x-2"
                  style={{ lineHeight: '20px' }}
                >
                  정답 확인하기
                  <Image src="/images/quiz/QuizRightArrow.svg" alt="Arrow icon" width={16} height={16} />
                </a>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default QuizFinishPage;