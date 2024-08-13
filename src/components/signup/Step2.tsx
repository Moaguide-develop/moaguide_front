import React from 'react';
import PhoneVerification from './modal/PhoneVerification';

interface StepProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step2: React.FC<StepProps> = ({ onNext, onPrev }) => (
    
  <div className='flex justify-center items-center'>
    <PhoneVerification onNext={onNext} />
  </div>
);

export default Step2;
