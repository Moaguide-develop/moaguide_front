'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';
import QuizBanner from '@/components/quize/QuizBanner';
import type { QuizTitle } from '@/types/homeComponentsType';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, basicAxiosInstance } from '@/service/axiosInstance';

const fetchQuizData = async (isLoggedIn: boolean) => {
  const axios = isLoggedIn ? axiosInstance : basicAxiosInstance;
  console.log('요청 URL:', axios.defaults.baseURL + `/quiz`);
  try {
    const { data } = await axios.get(`/quiz`);
    console.log('API 응답 데이터:', data);
    return data.quiz;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

const QuizeIndex: React.FC = () => {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizTitle | null>(null);
  const { isLoggedIn } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['QuizData'],
    queryFn: () => fetchQuizData(isLoggedIn)
  });

  useEffect(() => {
    if (data) setQuizData(data);
  }, [data]);

  const handleStartQuiz = () => {
    if (isLoggedIn) {
      router.push(`/quiz/${quizData?.id}`);
    } else {
      alert('로그인 후 시험응시가 가능합니다.');
      router.push('/sign');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('퀴즈 데이터를 가져오는 데 실패했습니다:', error);
    return <div>Failed to load quiz data</div>;
  }

  return (
    <div className="container w-4/5 mx-auto font-sans">
      {/* Quiz Banner */}
      <QuizBanner />

      {/* Main Info Section */}
      <div className="text-center my-5">
        <div className="text-4xl font-bold text-purple-600 mb-10">
          💸 시험은 2주에 1회 진행됩니다! 💸
        </div>
        <div className="text-4xl font-bold text-black mb-2">총 30문제</div>
        <div className="text-4xl font-bold text-black mb-12">제한시간: 30분</div>

        <div className="text-lg text-gray-800 mb-2">
          제한시간 30분 (시간 초과 시 자동 제출)
        </div>
        <div className="text-lg text-gray-800 mb-2">문제당 3점</div>
        <div className="text-lg text-gray-800">최고득점 90점 + (가점 10점) = 100점</div>

        <button
          onClick={() =>
            window.open(
              'https://contents.premium.naver.com/vestpie/pieceofmoney',
              '_blank'
            )
          }
          className="w-[300px] h-[52px] bg-gradient-to-r from-[#713CE2] to-[#5200FF] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 mx-auto hover:from-[#5b2bc6] hover:to-[#3f00c1] mb-4">
          첫달 무료로 공부하고 시험보기
          <img src="/images/mypage/right.svg" alt="arrow" className="w-4 h-4" />
        </button>
      </div>

      {/* Details Section */}
      <div className="text-center my-5 text-gray-700 border-t border-gray-t00 pt-5">
        <div>시험범위: {quizData?.questionRange ?? ''}</div>
        <div>참여자 대상: 모아가이드 유료회원</div>
        <div>
          시험기간: {quizData?.startDate ?? ''} ~ {quizData?.endDate ?? ''}
        </div>
        <div>최종 응시일정: {quizData?.ranking ?? ''}</div>
        <div>경품 지급일: {quizData?.paymentDate ?? ''}</div>
      </div>

      {/* Additional Information */}
      <div className="text-center my-5 text-gray-800">
        <div className="text-lg font-semibold">📌 추가 점수 제공 📌</div>
        <div className="text-sm text-gray-600">
          - 모아가이드 인스타그램 투자능력고사 게시글 @moaguide.official 태그하여
          스토리공유 (+5점) <br />- 모아가이드 프리미엄 콘텐츠 구독자 (+5점)
        </div>
      </div>

      {/* Prize Section */}
      <div className="text-center my-5">
        <div className="font-semibold text-lg">🎁 경품 안내 🎁</div>
        <div className="whitespace-pre-line text-gray-700">{quizData?.prize ?? ''}</div>
      </div>

      {/* Footer Button */}
      <div className="text-center my-8">
        <button
          onClick={handleStartQuiz}
          className="bg-purple-700 text-white py-3 px-8 rounded-lg text-lg font-semibold">
          시험 시작하기 ➔
        </button>
      </div>

      {/* Placeholder for additional content (e.g., prize images) */}
      <div className="mt-8">{/* 추가적인 이미지나 콘텐츠 배치 가능 */}</div>
    </div>
  );
};

export default QuizeIndex;
