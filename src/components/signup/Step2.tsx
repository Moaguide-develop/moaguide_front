import React from 'react';
import EmailVerification from './modal/EmailVerification';  // 이메일 인증 컴포넌트로 변경

interface Step2Props {
  onNext: () => void;
  onUpdate: (data: Partial<any>) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onUpdate }) => {
  // 이메일 변경 핸들러
  const handleEmailChange = (email: string) => {
    onUpdate({ email });  // 이메일 값을 업데이트
  };

  return (
    <EmailVerification
      onNext={onNext}
      onEmailChange={handleEmailChange}  // 이메일 변경 핸들러 전달
    />
  );
};

export default Step2;