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
  onAnswerChange: (index: number, answer: number) => void;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions, onAnswerChange }) => {
  const handleOptionClick = (questionIndex: number, choiceNumber: number) => {
    onAnswerChange(questionIndex, choiceNumber);
  };

  return (
    <div className="quiz-questions">
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <div className="text-lg font-semibold mb-2">{question.explanation}</div>
          <div className="flex flex-col space-y-2">
            {[question.choice1, question.choice2, question.choice3, question.choice4, question.choice5].map(
              (choice, choiceIndex) => (
                <button
                  key={choiceIndex}
                  onClick={() => handleOptionClick(index, choiceIndex + 1)}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src={`/sign/${choiceIndex + 1 === 0 ? 'Check' : 'Checked'}.svg`}
                    alt={`Option ${choiceIndex + 1}`}
                    width={24}
                    height={24}
                  />
                  <span>{choice}</span>
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;