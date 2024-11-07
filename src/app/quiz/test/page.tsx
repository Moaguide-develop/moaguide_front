'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import QuizTimer from '@/components/quiz/QuizTimer';
import QuizQuestions from '@/components/quiz/QuizQuestions';
import QuizSubmitButton from '@/components/quiz/QuizSubmitButton';
import { useQuizQuestions } from '@/factory/Quiz/QuizFetch';
import { submitQuizAnswers } from '@/factory/Quiz/QuizSubmit';
import CircleSkeleton from '@/components/skeleton/CircleSkeleton';

const QuizTestPage = () => {
  const { data: quizQuestions, isLoading, error } = useQuizQuestions();
  const [answers, setAnswers] = useState(Array(30).fill(0));
  const [insta, setInsta] = useState('');
  const [naver, setNaver] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

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

  if (showLoading || isLoading) return <CircleSkeleton />;

  if (error) return <div>Failed to load questions.</div>;

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
        type: 'a',
      };
      await submitQuizAnswers(payload);
      alert('퀴즈가 제출되었습니다.');
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };

  return (
    <Container>
      <div className="text-3xl font-bold mt-5">🎯 시험을 시작합니다 🎯</div>

      {showCountdown && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div key={countdown} className="text-6xl font-bold text-white animate-countdown">
            {countdown}
          </div>
        </div>
      )}

      <div className={`${showCountdown ? 'blur-lg' : ''}`}>
        <QuizTimer onTimeUp={handleTimeUp} isCountdownFinished={isCountdownFinished} />

        <div className="mt-4">
          <label>인스타그램 아이디</label>
          <input
            type="text"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="@username"
          />
        </div>

        <div className="mt-4">
          <label>성함/이메일</label>
          <input
            type="text"
            value={naver}
            onChange={(e) => setNaver(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="이름/이메일"
          />
        </div>

        <QuizQuestions questions={quizQuestions} onAnswerChange={handleAnswerChange} answers={answers} />

        <QuizSubmitButton onSubmit={submitQuiz} />
      </div>
    </Container>
  );
};

export default QuizTestPage;