import React from 'react';

interface StepProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step3: React.FC<StepProps> = ({ onNext, onPrev }) => (
  <div>
    <h2>모아가이드에서 사용할 상세정보를 입력해주세요</h2>
    <button onClick={onPrev}>이전</button>
    <button onClick={onNext}>다음으로</button>
  </div>
);

export default Step3;
