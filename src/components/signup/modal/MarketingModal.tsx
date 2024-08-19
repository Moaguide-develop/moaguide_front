import React from 'react';
import Image from 'next/image';
import Gnb from '@/components/common/Gnb';
import Navbar from '@/components/common/Navbar';

interface MarketingModalProps {
  onClose: () => void;
}

const MarketingModal: React.FC<MarketingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50">
      <Gnb/>
      <Navbar/>
      <div className="w-full mx-auto max-w-[640px]">
        <div className="flex items-center mb-4">
          <Image
            src="/sign/leftArrow.svg"
            alt="Back"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer mt-4 mb-8"
          />
        </div>
        <h3 className="text-xl font-bold mb-4">마케팅 정보 수집 동의</h3>
        <p>
          <ul>
            <li>개인정보의 처리 목적</li>
            <li>개인정보의 처리 및 보유 기간</li>
            <li>정보주체의 권리, 의무 및 행사 방법</li>
            <li>개인정보의 제3자 제공</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default MarketingModal;
