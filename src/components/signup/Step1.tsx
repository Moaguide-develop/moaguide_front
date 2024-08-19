import React, { useState } from 'react';
import Image from 'next/image';
import PrivacyModal from './modal/PrivacyModal';
import ServiceModal from './modal/ServiceModal';
import AgeModal from './modal/AgeModal';
import MarketingModal from './modal/MarketingModal';

interface StepProps {
  onNext: () => void;
  onUpdate: (data: { marketingConsent: boolean }) => void;
}

const Step1: React.FC<StepProps> = ({ onNext, onUpdate }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    privacy: false,
    service: false,
    age: false,
    marketing: false,
  });
  const [activePage, setActivePage] = useState<string | null>(null);

  const handleAllCheckedChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    const newChecks = {
      privacy: newCheckedState,
      service: newCheckedState,
      age: newCheckedState,
      marketing: newCheckedState,
    };
    setChecks(newChecks);
    onUpdate({ marketingConsent: newCheckedState });
  };

  const handleCheckChange = (key: string) => {
    const newChecks = { ...checks, [key]: !checks[key as keyof typeof checks] };
    setChecks(newChecks);
    setAllChecked(Object.values(newChecks).every(Boolean));

    if (key === 'marketing') {
      onUpdate({ marketingConsent: newChecks.marketing });
    }
  };

  const handleArrowClick = (key: string, event: React.MouseEvent) => {
    event.stopPropagation(); 
    setActivePage(key);
  };

  const closePage = () => {
    setActivePage(null);
  };

  const isNextEnabled = checks.privacy && checks.service && checks.age;

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[340px] w-full mx-auto mt-[76px]">
        <Image
          className='mb-12'
          src={'/sign/ProgressBar1.svg'}
          alt="ProgressBar"
          width={360}
          height={100}
        />
        <h2 className="text-xl font-bold mb-6 text-left">
          회원가입을 위해<br />
          <span className="text-purple-600">이용약관에 동의</span>해주세요
        </h2>
        <div className="space-y-4">
          <div
            onClick={handleAllCheckedChange}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${allChecked ? 'border-purple-600' : 'border-gray-300'}`}
          >
            <Image
              src={allChecked ? '/sign/CheckedCircle.svg' : '/sign/CheckCircle.svg'}
              alt="All Agree"
              width={24}
              height={24}
            />
            <span className="ml-2 font-medium">모두 동의합니다</span>
          </div>
          {['privacy', 'service', 'age', 'marketing'].map((key, index) => (
            <div
              key={key}
              className={`flex items-center justify-between py-4 rounded-lg cursor-pointer`}
              onClick={() => handleCheckChange(key)}
            >
              <div className="flex items-center">
                <Image
                  src={checks[key as keyof typeof checks] ? '/sign/Checked.svg' : '/sign/Check.svg'}
                  alt={`${key} checkbox`}
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-medium">
                  {index < 3 ? `[필수] ` : `[선택] `}
                  {key === 'privacy' && '개인정보 수집 / 이용동의'}
                  {key === 'service' && '서비스 이용 동의'}
                  {key === 'age' && '만 14세 이상입니다'}
                  {key === 'marketing' && '마케팅 메시지 수신 동의'}
                </span>
              </div>
              <Image
                src="/sign/Arrow.svg"
                alt="Arrow"
                width={24}
                height={24}
                onClick={(event) => handleArrowClick(key, event)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={onNext}
          className={`mt-6 w-full py-3 rounded-lg font-bold text-lg transition duration-300 ${
            isNextEnabled ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray100 text-heading4 text-gray400 cursor-not-allowed'
          }`}
          disabled={!isNextEnabled}
        >
          다음으로
        </button>
      </div>

      {activePage === 'privacy' && <PrivacyModal onClose={closePage} />}
      {activePage === 'service' && <ServiceModal onClose={closePage} />}
      {activePage === 'age' && <AgeModal onClose={closePage} />}
      {activePage === 'marketing' && <MarketingModal onClose={closePage} />}
    </div>
  );
};

export default Step1;
