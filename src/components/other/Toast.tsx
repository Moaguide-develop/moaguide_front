import React, { useState, useEffect } from 'react';

const Toast = ({
  message,
  onClose,
  duration = 1500
}: {
  message: string;
  onClose: () => void;
  duration?: number;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // 애니메이션 시간 후에 onClose 호출
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed z-[99999] w-full max-w-[350px] h-[50px]  flex justify-center items-center top-5 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-[12px] shadow-lg   ${isVisible ? 'animate-slide-in' : 'animate-slide-out'} `}>
      {message}
    </div>
  );
};

export default Toast;
