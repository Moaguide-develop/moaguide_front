import React from 'react';
import PhoneVerification from './modal/PhoneVerification';

interface StepProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step2: React.FC<StepProps> = ({ onNext, onPrev }) => (
    
  <div>
    <h2>가입할 로그인 정보를 입력해주세요</h2>
    <PhoneVerification/>
    <button onClick={onPrev}>이전</button>
    <button onClick={onNext}>다음으로</button>
  </div>
);

export default Step2;
