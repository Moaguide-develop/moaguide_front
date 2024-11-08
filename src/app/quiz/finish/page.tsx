'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FailItem } from '@/types/Quiz';
import { useMemberStore } from '@/store/user.store';
import Image from 'next/image';

const QuizFinishPage: React.FC = () => {
  const router = useRouter();
  const { member } = useMemberStore();
  const [scoreData, setScoreData] = useState<{
    score: number;
    faillist: FailItem[];
    failanswer: number[];
    plus: number;
    time: string;
  } | null>(null);
  const hasRedirected = useRef(false); 

  useEffect(() => {
    if (!hasRedirected.current) {
      const data = sessionStorage.getItem('scoreData');
      if (data) {
        setScoreData(JSON.parse(data));
      } else {
        alert('점수를 불러오는데 실패했습니다.');
        hasRedirected.current = true; 
        router.push('/');
      }
    }
  }, [router]);

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
    <div className="mx-auto text-center py-6">
      <h2 className="text-2xl font-bold mb-4">🎉 고생하셨습니다 🎉</h2>
      <p className="text-4xl font-extrabold mb-2">{member.memberNickName}님의 점수는</p>
      <p className="text-4xl font-extrabold mb-2">
        <span className="text-[#5B11F7]">{score}점</span> / 100점
      </p>
      <p className="text-base text-gray-500 mt-2">걸린 시간: {elapsedTime}</p>
      <p className="text-base text-gray-500 mt-2">정답수 {30-faillist.length}개 ({calculatedScore}점) + 가점 ({plus}점)</p>
      <div className="min-w-0 max-w-[330px] h-[50px] w-[90%] py-3 my-4 items-center mx-auto text-center rounded-[12px] text-lg font-semibold bg-gray-200 text-black">
        내가 틀린 문제
      </div>

      <div className="mt-6 space-y-8 w-[90%] max-w-[600px] mx-auto">
        {faillist.map((fail, index) => (
          <div
            key={index}
            className={`text-left mb-6 ${index !== faillist.length - 1 ? 'border-b border-gray-300 pb-6' : ''}`}
          >
            <p className="text-xl font-semibold mb-4">{fail.explanation}</p>
            <div className="">
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
              <Image
                src="/images/quiz/QuizRightArrow.svg"
                alt="Arrow icon"
                width={16}
                height={16}
              />
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-col mx-auto items-center justify-center space-y-4 mt-12">
        <button
          onClick={() => router.push('/quiz/ranking')}
          className="min-w-0 max-w-[330px] h-[50px] w-[90%] py-3 mt-4 items-center mx-auto text-center rounded-[12px] text-lg font-bold bg-gradient2 text-heading4 text-white"
        >
          내 순위 확인하기
        </button>
        <button
          onClick={() => router.push('/')}
          className="min-w-0 max-w-[330px] h-[50px] w-[90%] py-3 mt-4 items-center mx-auto text-center rounded-[12px] text-lg font-bold bg-gradient2 text-heading4 text-white"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default QuizFinishPage;