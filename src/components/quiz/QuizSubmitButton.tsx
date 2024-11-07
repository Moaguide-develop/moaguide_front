import React from 'react';

interface QuizSubmitButtonProps {
  onSubmit: () => void;
}

const QuizSubmitButton: React.FC<QuizSubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      className="px-4 py-2 bg-purple-600 text-white rounded"
    >
      제출하기
    </button>
  );
};

export default QuizSubmitButton;