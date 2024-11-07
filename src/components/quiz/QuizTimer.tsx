import React, { useEffect, useState } from 'react';

interface QuizTimerProps {
  onTimeUp: () => void;
  isCountdownFinished: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeUp, isCountdownFinished }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); 

  useEffect(() => {
    if (!isCountdownFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [isCountdownFinished, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const progressWidth = (timeLeft / (30 * 60)) * 100;
  const isTimeLow = timeLeft <= 5 * 60; 

  return (
    <div className="max-w-[300px] mx-auto">
      <div className="relative h-[25px] w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${progressWidth}%` }}
          className="h-full bg-gradient2 transition-width duration-1000 rounded-full"
        />
      </div>
      <div className={`text-center mt-2 font-semibold ${isTimeLow ? 'text-red-500' : 'text-black'}`}>
        남은 시간: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default QuizTimer;