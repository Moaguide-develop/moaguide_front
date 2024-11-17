import React, { useEffect } from 'react';
import Image from 'next/image';

interface QuizQuestionsProps {
  questions: {
    explanation: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    choice5: string;
  }[];
  answers: number[];
  onAnswerChange: (index: number, answer: number) => void;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions, answers, onAnswerChange }) => {
  useEffect(() => {
    // 오른쪽 클릭 방지
    const handleContextMenu = (e: MouseEvent | TouchEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('touchstart', handleContextMenu);

    // 텍스트 선택 방지
    document.body.style.userSelect = 'none';

    // Ctrl+C, Ctrl+X 복사 및 잘라내기 단축키 방지
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('touchstart', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'auto';
    };
  }, []);

  const handleOptionClick = (questionIndex: number, choiceNumber: number) => {
    onAnswerChange(questionIndex, choiceNumber);
  };

  return (
    <div className="quiz-questions">
      {questions.map((question, index) => (
        <div key={index} className={`mb-6 ${index !== questions.length - 1 ? 'border-b border-gray-300 pb-6' : ''}`}>
          <div className="text-xl font-semibold mb-4">{question.explanation}</div>
          <div className="flex flex-col space-y-2">
            {[question.choice1, question.choice2, question.choice3, question.choice4, question.choice5].map(
              (choice, choiceIndex) => {
                const isSelected = answers[index] === choiceIndex + 1;
                return (
                  <button
                    key={choiceIndex}
                    onClick={() => handleOptionClick(index, choiceIndex + 1)}
                    className="flex items-center space-x-2 text-left w-full"
                  >
                    <Image
                      src={`/sign/${isSelected ? 'Checked' : 'Check'}.svg`}
                      alt={`Option ${choiceIndex + 1}`}
                      width={24}
                      height={24}
                    />
                    <span className="flex-1 text-left">{choice}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;
