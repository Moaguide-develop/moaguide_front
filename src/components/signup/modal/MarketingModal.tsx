import React from 'react';
import Image from 'next/image';
import Gnb from '@/components/common/Gnb';
import Navbar from '@/components/common/Navbar';

interface MarketingModalProps {
  onClose: () => void;
}

const MarketingModal: React.FC<MarketingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
    <div className="mx-auto w-[90%] mb-[100px] lg:max-w-[640px] lg:mb-[20px]">
      <div className="flex items-center mb-4">
        <Image
          src="/sign/leftArrow.svg"
          alt="Back"
          width={24}
          height={24}
          onClick={onClose}
          className="cursor-pointer mt-4 mb-8"
          placeholder="blur"
          priority
          blurDataURL="/sign/leftArrow.svg"
        />
      </div>
        <h3 className="text-xl font-bold mb-4">마케팅 정보 수집 동의</h3>
        <div className="text-sm space-y-4">
          
          <p>
          개인정보보호법 제22조 제4항에 의해 선택정보 사항에 대해서는 기재하지 않으셔도 서비스를 이용하실 수 있습니다.
          </p>

          <p>
          마케팅 정보 수신에 동의하실 경우, 모아가이드는 서비스를 운용함에 있어 각종 정보를 서비스 화면, 이메일, 앱푸시, 카카오톡, 문자 등의 방법으로 회원에게 정보를 제공할 수 있으며, 결제 안내 등 의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공됩니다.
          </p>

          <p>
          마케팅 및 광고의 활용 : 신규 서비스(기능) 개발 안내 및 맞춤 서비스 제공, 뉴스레터 발송, 할인 및 이벤트 등 광고성 정보 제공
          </p>

          <p>
          수집 항목 : 이메일, 휴대폰 번호, 디바이스 토큰 정보, 콘텐츠 이용 내역, 상품 구매 및 결제내역 등 서비스 이용 내역
          </p>

          <p>
          개인정보보호법 제22조 제4항에 의해 선택정보 사항에 대해서는 기재하지 않으셔도 서비스를 이용하실 수 있습니다.  단, 혜택, 이벤트 및 이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.
          </p>

          <p>
          마케팅 정보를 원하지 않을 경우 ‘설정 {'>'} 알림 설정’에서 철회를 요청할 수 있습니다. 또한 향후 마케팅 활용에 새롭게 동의하고자 하는 경우에는 ‘설정 {'>'} 알림 설정’에서 동의하실 수 있습니다.
          </p>

          <p>
          마케팅 정보 수신 동의에 의거하여 수집된 항목은 회원 탈퇴 시 파기 처리됩니다. 단, 관계 법령의 규정에 따라 보존할 의무가 있으면 해당 기간 동안 보존될 수 있습니다.
          </p>
          </div>
      </div>
    </div>
  );
};

export default MarketingModal;
