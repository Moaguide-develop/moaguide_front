import React from 'react';
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