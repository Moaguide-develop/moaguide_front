import React from 'react';

interface QuizSubmitButtonProps {
  onSubmit: () => void;
}

const QuizSubmitButton: React.FC<QuizSubmitButtonProps> = ({ onSubmit }) => {
  return (
    <div className="flex justify-center mt-8 mb-4"> 
      <button
        onClick={onSubmit}
        className="w-[330px] py-3 text-center rounded-[12px] text-lg font-bold bg-gradient2 text-heading4 text-white cursor-pointer"
      >
        제출하기
      </button>
    </div>
  );
};

export default QuizSubmitButton;