import React from 'react';
import Image from 'next/image';

interface PrivacyModalProps {
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto z-[99999]">
      <div className="mx-auto w-[90%] mb-[100px] lg:max-w-[640px] lg:mb-[20px]">
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
        <h3 className="text-xl font-bold mb-4">개인정보 수집 / 이용동의</h3>

        <div className="text-sm space-y-4">
          <h4 className="font-bold">제1조 개인정보의 수집과 이용 목적</h4>
          <p>
            회사는 아래와 같은 목적을 위해 개인정보를 활용합니다. 이용자가 제공한 모든 정보는 다음의 목적 외 용도로 사용되지 않으며, 이용 목적이 변경될 때에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            <ul className="list-disc list-inside mt-2">
              <li>회원 관리: 회원제 서비스 제공, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 민원 처리 등</li>
              <li>서비스 제공에 관한 계약 이행 및 요금 정산: 콘텐츠 제공, 구매 및 요금 결제, 금융 거래 본인 인증</li>
              <li>신규 서비스 개발 및 마케팅 활용: 통계학적 특성, 이용 형태, 접속 빈도 분석</li>
            </ul>
          </p>

          <h4 className="font-bold">제2조 개인정보의 수집 항목과 수집 방법</h4>
          <p>
            회사는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 개인정보를 수집합니다. 
            <ul className="list-disc list-inside mt-2">
              <li>필수정보: 이름, 이메일, 비밀번호</li>
              <li>선택정보: 전화번호, 주소, 나이, 성별, 직업</li>
              <li>유료 서비스 시 결제 정보: 신용카드 정보, 결제 기록</li>
            </ul>
          </p>

          <h4 className="font-bold">제3조 개인정보의 처리 및 보유 기간</h4>
          <p>
            회사는 개인정보를 수집 시 동의 받은 보유 기간 내에서 처리 및 보유하며, 목적 달성 시 파기합니다. 
            <ul className="list-disc list-inside mt-2">
              <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
              <li>법령에 따른 보관: 전자금융거래 기록 5년, 소비자 보호 관련 기록 3-5년</li>
            </ul>
          </p>

          <h4 className="font-bold">제4조 개인정보의 제3자 제공</h4>
          <p>
            회사는 원활한 서비스 제공을 위해 다음의 경우에 개인정보를 제3자에게 제공합니다.
            <ul className="list-disc list-inside mt-2">
              <li>PG사: 서비스 요금 정산을 위한 결제 정보</li>
              <li>법령에 따라 수사 기관이 요청하는 경우</li>
            </ul>
          </p>

          <h4 className="font-bold">제5조 개인정보의 파기 절차 및 방법</h4>
          <p>
            회사는 개인정보 보유 기간이 경과한 경우 지체없이 파기합니다. 전자적 파일은 복구 불가능한 기술을 통해 삭제하며, 종이는 분쇄기로 파기합니다.
          </p>

          <h4 className="font-bold">제6조 개인정보 처리 업무의 위탁</h4>
          <p>
            회사는 원활한 서비스 제공을 위해 개인정보 처리 업무를 아래와 같이 위탁하고 있습니다. 
            <ul className="list-disc list-inside mt-2">
              <li>수탁자: 유료 서비스 결제 대행사 (PG사)</li>
              <li>위탁 목적: 결제 서비스 제공 및 환불 처리</li>
            </ul>
          </p>

          <h4 className="font-bold">제7조 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항</h4>
          <p>
            회사는 이용자의 맞춤형 서비스를 제공하기 위해 쿠키(cookie)를 사용합니다. 쿠키는 이용자의 컴퓨터 하드디스크에 저장되는 작은 텍스트 파일로, 접속 빈도 분석 및 맞춤 서비스 제공을 위해 사용됩니다. 이용자는 쿠키 사용에 대해 선택할 수 있습니다.
          </p>

          <h4 className="font-bold">제8조 정보주체와 법정대리인의 권리</h4>
          <p>
            정보주체는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리 정지 요청을 할 수 있습니다. 요청은 서면, 전자우편 등을 통해 가능합니다. 14세 미만 아동의 경우, 법정대리인이 요청해야 합니다.
          </p>

          <h4 className="font-bold">제9조 개인정보 보호를 위한 조치</h4>
          <p>
            회사는 개인정보 보호를 위해 내부 관리 계획 수립, 개인정보 접근 제한, 암호화, 보안 프로그램 설치 등의 조치를 취하고 있습니다.
          </p>

          <h4 className="font-bold">제10조 개인정보 보호 책임자</h4>
          <p>
            회사는 개인정보 보호를 위해 책임자를 지정하고 있으며, 관련 문의는 아래 연락처로 해주시기 바랍니다.
            <br />
            이름: 노상현<br />
            전화: 010-2247-6408
          </p>

          <h4 className="font-bold">제11조 권익침해에 대한 구제방법</h4>
          <p>
            정보주체는 개인정보 침해로 인한 구제를 위해 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담을 신청할 수 있습니다. 기타 기관은 아래와 같습니다:
            <ul className="list-disc list-inside mt-2">
              <li>개인정보분쟁조정위원회: 1833-6972</li>
              <li>개인정보침해신고센터: 118</li>
              <li>대검찰청: 1301</li>
              <li>경찰청: 182</li>
            </ul>
          </p>

          <h4 className="font-bold">제12조 고지의 의무</h4>
          <p>
            이 개인정보처리방침은 2024년 9월 1일부터 적용되며, 변경 사항이 있을 경우 7일 전부터 웹사이트를 통해 공지됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;