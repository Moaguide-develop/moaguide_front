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
      setTimeLeft((prev) => prev - 1);
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

  return (
    <div>
      <div className="text-center mb-2">남은 시간: {formatTime(timeLeft)}</div>
      <div
        style={{
          width: `${progressWidth}%`,
          height: '8px',
          backgroundColor: '#6b46c1',
          transition: 'width 1s linear'
        }}
      />
    </div>
  );
};

export default QuizTimer;