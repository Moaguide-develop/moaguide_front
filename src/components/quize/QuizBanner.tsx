import React from 'react';

const QuizBanner: React.FC = () => {
  return (
    <div className="bg-gray-200 w-full h-[300px] max-w-3xl mx-auto rounded-lg shadow-lg flex justify-center items-center">
      {/* 배너 이미지 */}
      <img
        src="/images/home/quizBanner.svg" // SVG 파일의 경로를 직접 설정
        alt="Quiz Banner"
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default QuizBanner;
