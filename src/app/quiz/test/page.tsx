'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import QuizQuestions from '@/components/quiz/QuizQuestions';
import QuizSubmitButton from '@/components/quiz/QuizSubmitButton';
import { useQuizQuestions } from '@/factory/Quiz/QuizFetch';
import { submitQuizAnswers } from '@/factory/Quiz/QuizSubmit';
import QuizSkeleton from '@/components/skeleton/QuizSkeleton';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/service/axiosInstance';

const QuizTestPage = () => {
  const { data, isLoading } = useQuizQuestions();
  const [answers, setAnswers] = useState(Array(30).fill(0));
  const [insta, setInsta] = useState('');
  const [naver, setNaver] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const router = useRouter();
  const hasFetched = useRef(false);
  const quizType = data?.type;
  const questions = data?.questions;
  const timeLeftRef = useRef(timeLeft);
  const handleSubmitQuizRef = useRef<(autoSubmit?: boolean) => void>();
  const hasAlertShown = useRef(false);

  timeLeftRef.current = timeLeft;

  const handleSubmitQuiz = async (autoSubmit = false) => {
    try {
      const adjustedAnswers = answers.map((answer) => (answer === 0 && autoSubmit ? 0 : answer));

      const elapsedTime = 30 * 60 - timeLeftRef.current; 
      const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
      const seconds = String(elapsedTime % 60).padStart(2, '0');
      const elapsedFormattedTime = `00:${minutes}:${seconds}`;

      const payload = {
        answer: adjustedAnswers,
        insta,
        naver,
        time: elapsedFormattedTime,
        type: quizType,
      };
      const response = await submitQuizAnswers(payload);

      if (!hasAlertShown.current) {
        alert('퀴즈가 제출되었습니다.');
        hasAlertShown.current = true;
      }
      sessionStorage.setItem('scoreData', JSON.stringify(response));
      router.push('/quiz/finish');
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };

  handleSubmitQuizRef.current = handleSubmitQuiz;

  useEffect(() => {
    const checkQuizParticipation = async () => {
      if (!hasFetched.current) {
        try {
          hasFetched.current = true;
          await axiosInstance.get('/quiz/check/1');
        } catch (error: any) {
          if (error.response && error.response.status === 409) {
            alert("이미 시험에 응시했습니다!");
            router.push('/');
          }
        }
      }
    };

    checkQuizParticipation();
  }, [router]);

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

  useEffect(() => {
    if (isCountdownFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (!hasAlertShown.current) {
              alert('시간이 만료되었습니다. 자동으로 시험을 제출합니다.');
              handleSubmitQuizRef.current?.(true);
              hasAlertShown.current = true;
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCountdownFinished]);

  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; 
  
      await handleSubmitQuizRef.current?.(true);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (showLoading || isLoading) return <QuizSkeleton />;

  const handleAnswerChange = (index: number, answer: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleAlertSubmit = () => {
    if (answers.includes(0)) {
      if (window.confirm('풀지 않은 문제가 있습니다. 그래도 제출하시겠습니까?')) {
        handleSubmitQuiz(true);
      }
    } else {
      handleSubmitQuiz();
    }
  };

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
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
          <div className="max-w-[300px] mx-auto">
            <div className="relative h-[25px] w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                 style={{ width: `${(timeLeft / (30 * 60)) * 100}%` }}
                className="h-full bg-gradient2 transition-width duration-1000 rounded-full"
              />
            </div>
            <div className={`text-center mt-2 font-semibold ${timeLeft <= 5 ? 'text-red-500' : 'text-black'}`}>
              남은 시간: {formatTime(timeLeft)}
            </div>
          </div>

          <div className='text-red-500 my-2 font-semibold'>
          ※ 시험 도중 페이지를 나가시면 다시 응시하실 수 없습니다! ※
          </div>

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
  
          <div className="w-full mx-auto">
            <QuizSubmitButton onSubmit={handleAlertSubmit} />
          </div>
        </div>
      </Container>
    );
  };
  
  export default QuizTestPage;
              