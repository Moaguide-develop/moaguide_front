import React from 'react';

interface StepProps {
  onPrev: () => void;
}

const Step4: React.FC<StepProps> = ({ onPrev }) => (
  <div>
    <h2>회원가입 완료</h2>
    <button onClick={onPrev}>이전</button>
    <button>가입 완료</button>
  </div>
);

export default Step4;
