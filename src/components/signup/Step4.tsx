import React, { useState, useEffect } from 'react';

interface StepProps {
  onNext: () => void;
}

const Step4: React.FC<StepProps> = ({ onNext }) => {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [birthdate, setBirthdate] = useState('');
  const [isBirthdateValid, setIsBirthdateValid] = useState(false);
  const [investmentExperience, setInvestmentExperience] = useState<null | string>(null);
  const [investmentYears, setInvestmentYears] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (investmentExperience === 'yes' && investmentYears && nickname && isNicknameValid && isBirthdateValid) {
      setIsFormValid(true);
    } else if (investmentExperience === 'no' && nickname && isNicknameValid && isBirthdateValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nickname, isNicknameValid, birthdate, isBirthdateValid, investmentExperience, investmentYears]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameValid(null);
  };

  const checkNickname = () => {
    // 여기에 실제 API 호출 로직을 추가하세요
    // 예시: axios.get('/api/check-nickname', { params: { nickname } }).then(response => setIsNicknameValid(response.data.isValid));
    // 지금은 무조건 사용 가능한 닉네임으로 처리
    setIsNicknameValid(true);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      setBirthdate(value);
      if (value.length === 8) {
        const formattedDate = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
        setBirthdate(formattedDate);
        setIsBirthdateValid(true);
      } else {
        setIsBirthdateValid(false);
      }
    }
  };

  const handleInvestmentExperienceChange = (experience: string) => {
    setInvestmentExperience(experience);
    if (experience === 'no') {
      setInvestmentYears('');
    }
  };

  const handleInvestmentYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentYears(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[340px] w-full mx-auto mt-[76px]">
        <img className='mb-12' src={'/sign/ProgressBar4.svg'} alt="ProgressBar" width={360} height={100} />
        <h2 className="text-xl font-bold mb-6 leading-tight">
          모아가이드에서 사용할<br /><span className="text-purple-600">상세정보</span>를 입력해주세요
        </h2>

        <div className="mt-10 mb-8">
          <div className="text-body3">닉네임</div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임 입력"
              className="flex-1 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2"
            />
            <div
              onClick={checkNickname}
              className={`ml-[6px] px-4 py-[14px] bg-black rounded-[12px] text-white text-title2 cursor-pointer`}
            >
              중복확인
            </div>
          </div>
          <div className="mt-2 min-h-[25px]">
          {isNicknameValid === true && (
            <p className="text-green-500">사용 가능한 닉네임입니다.</p>
          )}
          {isNicknameValid === false && (
            <p className="text-red-500">이미 사용중인 닉네임입니다.</p>
          )}
          </div>
        </div>

        <div className='mb-10'>
        <div className="text-body3">생년월일</div>
          <input
            type="text"
            placeholder="생년월일 8자리 입력"
            value={birthdate}
            onChange={handleBirthdateChange}
            className="w-full px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 mt-2"
          />
        </div>

        <div className="mb-4">
        <div className="text-body3">투자 경험</div>
          <div className='flex w-full'>
          <button
            onClick={() => handleInvestmentExperienceChange('no')}
            className={`flex-1 py-3 px-4 rounded-lg border pr-1 ${investmentExperience === 'no' ? 'bg-purple-600 text-white' : 'border-gray100 text-gray-600'}`}
          >
            투자 경험 없음
          </button>
          <button
            onClick={() => handleInvestmentExperienceChange('yes')}
            className={`flex-1 py-3 px-4 rounded-lg border pl-1 ${investmentExperience === 'yes' ? 'bg-purple-600 text-white' : 'border-gray100 text-gray-600'}`}
          >
            투자 경험 있음
          </button>
          </div>
        </div>

        {investmentExperience === 'yes' && (
          <div className="mb-4">
            <label>투자 경력 (N년)</label>
            <input
              type="text"
              value={investmentYears}
              onChange={handleInvestmentYearsChange}
              className="w-full py-3 px-4 rounded-lg"
            />
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg text-white text-lg ${isFormValid ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' : 'bg-gray-100 text-gray-400'}`}
        >
          가입완료
        </button>
      </div>
    </div>
  );
};

export default Step4;
