'use client';

import Container from '@/components/common/Container';
import { useState } from 'react';
import QuizTimer from '@/components/quiz/QuizTimer';
import QuizQuestions from '@/components/quiz/QuizQuestions';
import QuizSubmitButton from '@/components/quiz/QuizSubmitButton';
import { useQuizQuestions } from '@/factory/Quiz/QuizFetch';
import { submitQuizAnswers } from '@/factory/Quiz/QuizSubmit';


const QuizTestPage = () => {
  const { data: quizQuestions, isLoading, error } = useQuizQuestions();
  const [answers, setAnswers] = useState(Array(30).fill(0));
  const [insta, setInsta] = useState('');
  const [naver, setNaver] = useState('');

  if (isLoading) return <div>Loading questions...</div>;
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
      
      <QuizTimer onTimeUp={handleTimeUp} />
      
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

      <QuizQuestions questions={quizQuestions} onAnswerChange={handleAnswerChange} />
      
      <QuizSubmitButton onSubmit={submitQuiz} />
    </Container>
  );
};

export default QuizTestPage;