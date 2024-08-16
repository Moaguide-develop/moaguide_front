import React from 'react';
import PhoneVerification from './modal/PhoneVerification';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<any>) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onPrev, onUpdate }) => {
  const handlePhoneNumberChange = (number: string) => {
    onUpdate({ phoneNumber: number });
  };

  return (
    <PhoneVerification
      onNext={onNext}
      onPhoneNumberChange={handlePhoneNumberChange}
    />
  );
};

export default Step2;
