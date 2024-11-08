'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import QuizTimer from '@/components/quiz/QuizTimer';
import QuizQuestions from '@/components/quiz/QuizQuestions';
import QuizSubmitButton from '@/components/quiz/QuizSubmitButton';
import { useQuizQuestions } from '@/factory/Quiz/QuizFetch';
import { submitQuizAnswers } from '@/factory/Quiz/QuizSubmit';
import QuizSkeleton from '@/components/skeleton/QuizSkeleton';

const QuizTestPage = () => {
  const { data, isLoading } = useQuizQuestions();
  const [answers, setAnswers] = useState(Array(30).fill(0));
  const [insta, setInsta] = useState('');
  const [naver, setNaver] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  const quizType = data?.type; 
  const questions = data?.questions; 

  useEffect(() => {
    if (showLoading || showCountdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoading, showCountdown]);

  useEffect(() => {
    if (!isLoading) {
      const loadingTimer = setTimeout(() => {
        setShowLoading(false);
        setShowCountdown(true);
      }, 2000);
      return () => clearTimeout(loadingTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 1) {
        setTimeout(() => {
          setShowCountdown(false);
          setIsCountdownFinished(true);
        }, 1000);
      }

      return () => clearInterval(countdownTimer);
    }
  }, [showCountdown, countdown]);

  if (showLoading || isLoading) return <QuizSkeleton />;

  const handleAnswerChange = (index: number, answer: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleTimeUp = () => {
    submitQuiz();
  };

  const submitQuiz = async () => {
    if (answers.includes(0)) {
      alert('모든 문제를 풀어주세요.');
      return;
    }

    try {
      const payload = {
        answer: answers,
        insta,
        naver,
        time: '00:30:00',
        type: quizType,
      };
      await submitQuizAnswers(payload);
      alert('퀴즈가 제출되었습니다.');
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };

  return (
      <Container>
      {showCountdown && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div key={countdown} className="text-6xl font-bold text-white animate-countdown">
            {countdown}
          </div>
        </div>
      )}
      <div className={`${showCountdown ? 'blur-lg' : ''}`}>
      <div className="text-center text-2xl font-bold mt-5">🎯 시험을 시작합니다 🎯</div>
        <div className="text-center mt-4">
          <QuizTimer onTimeUp={handleTimeUp} isCountdownFinished={isCountdownFinished} />
          <div className="max-w-[460px] my-4 items-center mx-auto text-center text-black text-xl font-semibold font-['Pretendard']">
            인스타그램 스토리를 통해 @moaguide.official 태그 후 게시물을 공유하셨다면 인스타그램 아이디를 입력해주세요! <br/>(가점 제공 확인용)
          </div>

          <div className="w-full max-w-md mx-auto">
            <input
              type="text"
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              className="w-full max-w-[360px] px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"
              placeholder="아이디 입력"
            />
          </div>

          <div className="max-w-[350px] mt-4 mb-2 items-center mx-auto text-center text-black text-xl font-semibold font-['Pretendard']">
            프리미엄 콘텐츠(학습하기)를 구독하셨다면 성함과 구독하신 아이디를 입력해주세요.
          </div>

          <div className="max-w-[350px] mb-4 items-center mx-auto text-center text-black text-sm font-base font-['Pretendard']">
            (ex. 모아가이드 / moaguide@naver.com)
          </div>

          <div className="mt-2 w-full max-w-md mx-auto">
            <input
              type="text"
              value={naver}
              onChange={(e) => setNaver(e.target.value)}
              className="w-full max-w-[360px] px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 focus:outline-normal"
              placeholder="성함/이메일 입력"
            />
          </div>
        </div>

        <div className="mt-12 max-w-[600px] mx-auto">
          <QuizQuestions questions={questions} onAnswerChange={handleAnswerChange} answers={answers} />
        </div>
        
        <div className='w-full mx-auto'>
          <QuizSubmitButton onSubmit={submitQuiz} />
        </div>
      </div>
    </Container>
  );
};

export default QuizTestPage;