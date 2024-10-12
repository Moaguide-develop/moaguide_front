import React from 'react';
import EmailVerification from './modal/EmailVerification';  

interface Step2Props {
  onNext: () => void;
  onUpdate: (data: Partial<any>) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onUpdate }) => {

  const handleEmailChange = (email: string) => {
    onUpdate({ email }); 
  };

  return (
    <EmailVerification
      onNext={onNext}
      onEmailChange={handleEmailChange}  
    />
  );
};

export default Step2;