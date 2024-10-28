import React from 'react';
import Image from 'next/image';

interface PrivacyControllModalProps {
  onClose: () => void;
}

const PrivacyControllModal: React.FC<PrivacyControllModalProps> = ({ onClose }) => {
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
            placeholder="blur"
            priority
            blurDataURL="/sign/leftArrow.svg"
          />
        </div>
        <h3 className="text-xl font-bold mb-4">개인정보처리방침</h3>

        <div className="text-sm space-y-4">
          <p>
          모아 가이드(이하 “회사”)는 이용자의 개인정보와 권익을 보호하기 위해 개인정보보호법 및 관계 법령이 정한 바를 철저히 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 회사는 이용자에게 개인정보 처리에 관한 절차 및 기준, 보호 대책 등을 안내하기 위하여 개인정보처리방침을 수립ㆍ공개합니다.<br/><br/>
          </p>

          <h4 className="font-bold">제1조 개인정보의 수집과 이용 목적</h4>
          <p>
          회사는 아래와 같은 목적을 위해 개인정보를 활용합니다. 이용자가 제공한 모든 정보는 다음의 목적 외 용도로 사용되지 않으며, 이용 목적이 변경될 때에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. <br/> <br/>
          - 회원 관리 : 회원제 서비스 제공, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의 여부 확인, 불만 처리 등 민원 처리<br/>
          - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산 : 콘텐츠 제공, 구매 및 요금 결제, 물품 배송 또는 청구지 등 발송, 금융 거래 본인 인증 및 금융 서비스, 서비스 이용 기록<br/>
          - 신규 서비스 개발 및 마케팅 활용 : 통계학적 특성, 이용 형태, 접속 빈도, 회원의 서비스 이용에 대한 통계<br/><br/>
          </p>

          <h4 className="font-bold">제2조 개인정보의 수집 항목과 수집 방법</h4>
          <p>
            회사는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 아래와 같은 개인정보를 수집하고 있습니다.  <br/><br/>
            1.회원 가입 시<br/>
            필수정보 : 이름, 이메일, 비밀번호<br/>
            선택정보 : 전화번호, 주소, 나이, 성별, 직업, 소속<br/>
            유료 서비스 이용 과정에서 결제를 위한 신용카드 정보, 은행계좌 정보, 휴대폰 정보, 결제 기록이 수집될 수 있습니다.<br/><br/>
            2.서비스 이용 시<br/>
            단말기 정보, 쿠키, 서비스 이용 기본 통계가 개인을 식별할 수 없는 형태로 수집될 수 있습니다.<br/><br/>
          </p>

          <h4 className="font-bold">제3조 개인정보 수집에 대한 동의</h4>
          <p>
          회사는 이용자의 개인정보 수집과 관련하여 회원 가입 페이지에서 이용자의 동의를 받고 있습니다. 회원 가입 시 이용약관 및 개인정보처리방침에 동의 버튼을 클릭하면 개인정보 수집에 동의하신 것으로 간주합니다.<br/><br/>
          </p>

          <h4 className="font-bold">제4조 개인정보의 처리 및 보유 기간</h4>
          <p>
          회사는 이용자로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를 처리 및 보유하며, 원칙적으로 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/>
          각각의 개인정보 처리 및 보유기간은 다음과 같습니다.<br/><br/>
          1.홈페이지 회원 가입 및 회원 관리 : 홈페이지 탈퇴 시까지<br/>
          다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지<br/>
          - 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지<br/>
          - 홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지<br/><br/>
         
          2.서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산 : 재화서비스 공급완료 및 요금결제·정산 완료시까지 다만, 전자금융거래법, 전자상거래 등에서의 소비자보호에 관한 법률, 통신비밀보호법 등 관계법령의 규정에 의하여 일정기간 정보를 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정기간 동안 개인정보를 보관합니다.<br/>
          - 건당 거래금액 1만원 이하 전자금융거래에 관한 기록 : 1년(전자금융거래법 제 22조)<br/>
          - 건당 거래금액 1만원 초과 전자금융거래에 관한 기록 : 5년(전자금융거래법 제22조)<br/>
          - 전자지급수단 이용과 관련된 거래 승인에 관한 기록 : 1년(전자금융거래법 제22조)<br/>
          - 전자금융거래 종류, 금액 및 전자금융거래의 상대방에 관한 정보, 전자금융거래의 거래일시, 전자적 장치의 종류 등의 정보, 전자금융거래가 계좌를 통하여 이루어지는 경우 거래계좌의 명칭 또는 번호, 금융회사 또는 전작금융업자가 전자금융거래의 대가로 받은 수수료, 지급인의 출금 동의에 관한 사항 : 5년(전자금융거래법 제22조)<br/>
          - 전자금융거래와 관련된 전자적 장치의 접속기록 : 5년(전자금융거래법 제22조)<br/>
          - 전자금융거래 신청 및 조건의 변경에 관한 사항 : 5년(전자금융거래법 제22조)<br/>
          - 표시광고에 관한 기록 : 6개월(전자상거래 등에서의 소비자보호에 관한 법률 제6조)<br/>
          - 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년(전자상거래 등에서의 소비자보호에 관한 법률 제6조)<br/>
          - 계약 또는 청약철회 등에 관한 기록 : 5년(전자상거래 등에서의 소비자보호에 관한 법률 제6조)<br/>
          - 대금결제 및 재화 등의 공급에 관한 기록 : 5년(전자상거래 등에서의 소비자보호에 관한 법률 제6조)<br/>
          - 통신사실확인 자료 중 인터넷통신 또는 인터넷의 사용자가 전기통신역무를 이용한 사실에 관한 컴퓨터통신 또는 인터넷의 로그기록자료 :3개월(통신비밀보호법)<br/>
          - 통신사실확인 자료 중 인터넷통신 또는 인터넷의 사용자가 전기통신망에 접속하기 위하여 사용하는 정보통신기기의 위치를 확인할 수 있는 접속지의 추적자료 : 3개월(통신비밀보호법)<br/><br/>
          </p>

          <h4 className="font-bold">제5조 개인정보 처리 업무의 위탁</h4>
          <p>
          회사는 원활한 서비스 제공을 위해 최소한의 범위에서 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다. 회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개 하도록 하겠습니다. <br/> <br/>
          - 수탁자: 유료 서비스의 결제 대행사(PG) <br/>
          - 위탁업무 내용: 유료 서비스 구매, 결제취소, 환불 처리 등에 필요한 결제 서비스(휴대전화, 신용카드, 계좌 이체 등) <br/>
          - 개인정보 보유 및 이용기간: 결제일을 포함하여 5년간 보유 또는 위탁계약 종료시까지 보유 및 이용<br/><br/>
          </p>

          <h4 className="font-bold">제6조 개인정보의 제3자 제공</h4>
          <p>
          회사는 이용자의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법에서 허용하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.<br/>
          회사는 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.<br/><br/>
          1.서비스 제공에 따른 요금 정산을 위하여 필요한 경우<br/>
          - 제공받는자: PG사<br/>
          - 제공목적: 서비스 제공 요금 정산<br/>
          - 제공항목: 결제일, 결제금액, 결제자 연락처(이메일, 전화번호), 결제 수단 정보<br/>
          - 보유 및 이용 기간: 5년<br/><br/>
        
          2.관계 법령에 의거하거나, 행정 목적이나 수사 목적으로 행정 관청 또는 수사 기관이 요구해 온 경우(법률에 규정된 바에 따라 영장 또는 기관장의 직인이 날인된 서면에 의한 경우 등 적법한 절차에 따라 제공)<br/>
          - 제공받는자: 요청 기관<br/>
          - 제공목적: 해당 기관의 개인정보이용 목적에 따라 상이<br/>
          - 제공항목: 당사 보유 개인정보 중 해당 기관에서 요청한 항목<br/>
          - 보유 및 이용 기간: 관련 법령 및 해당 기관의 규정에 따름<br/><br/>

          3.다음과 같이 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.<br/><br/>
          </p>

          <h4 className="font-bold">제7조 개인정보의 파기 절차 및 방법</h4>
          <p>
          회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 이용자가 회원 가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라 일정 기간 동안 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우 이외의 다른 목적으로 이용되지 않습니다.
          <br/>파기 절차와 방법은 아래와 같습니다.<br/><br/>
          1.파기 절차<br/>
          회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인 정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br/><br/>

          2.파기 방법<br/>
          전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br/><br/>
          </p>

          <h4 className="font-bold">제8조 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</h4>
          <p>
          회사는 쿠키(cookie)를 사용합니다. 쿠키란 웹사이트 운영에 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다. 쿠키는 이용자의 취향과 관심 분야, 사용 환경, 접속 횟수 등에 따른 맞춤형 서비스 제공을 위해 사용됩니다. 이용자 편의를 위해 대부분의 웹사이트가 쿠키 데이터를 저장하고 읽도록 허용할 것을 권장하고 있습니다.<br/>
          이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 이용자는 웹 브라우저에서 옵션을 설정해 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 하거나, 쿠키의 저장을 차단할 수 있습니다.<br/>
          쿠키 설정을 변경하는 방법은 웹브라우저 및 프로그램에 따라 상이하므로 인터넷 검색 등을 이용하시거나 웹사이트의 1:1 문의를 통해 문의 주시기 바랍니다.<br/><br/>
          </p>

          <h4 className="font-bold">제9조 정보주체와 법정대리인의 권리·의무 및 행사방법</h4>
          <p>
          1.정보주체는 회사에 대해 언제든지 개인정보 열람정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
          ※ 만 14세 미만 아동에 관한 개인정보의 열람 등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.<br/><br/>

          2.권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.<br/><br/>

          3.권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/><br/>

          4.개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/><br/>

          5.개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/><br/>

          6.회사는 정보주체 권리에 따른 열람의 요구, 정정삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br/><br/>
          </p>

          <h4 className="font-bold">제10조 개인정보의 안전성 확보조치 및 관리적 보호 대책</h4>
          <p>
            &lt;안전성 보호조치&gt;<br />
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br/><br/>
            1.관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영, 정기적 직원 교육<br/>
            2.기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신<br/>
            3.물리적 조치 : 전산실, 자료보관실 등의 접근통제<br/><br/>

            &lt;관리적 보호대책&gt;<br />
            회사는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하고 있으며,  개인정보 취급 직원을 개인정보 관리 업무를 수행하는 자, 업무상 개인정보의 취급이 불가피한 자로 엄격히 제한하고, 담당 직원에 대한 수시 교육을 통하여 본 정책의 준수를 강조하는 등의 관리적 대책을 강구하고 있습니다.  ㈜서울프라퍼티인사이트는 개인정보 보호를 위해 개인정보 보호 책임자를 지정하고 있습니다. 개인정보와 관련해 문의해 주시면 성심을 다해 답변해 드리겠습니다.<br/><br/>

            개인정보 보호 책임자<br/>
            - 이름 : 노상현<br/>
            - 직위 : 대표<br/>
            - 전화 : 010-2247-6408<br/><br/>
          </p>

          <h4 className="font-bold">제11조 정보주체의 권익침해에 대한 구제방법</h4>
          <p>
          1.정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br/>
          - 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (kopico.go.kr) <br/>
          - 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr) <br/>
          - 대검찰청 : (국번없이) 1301 (www.spo.go.kr) <br/>
          - 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr) <br/><br/>

          2.회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 아래의 담당부서로 연락해 주시기 바랍니다.<br/>
          - 개인정보보호 관련 고객 상담 및 신고 부서명 : 경영관리 <br/>
          - 담당자 : 노상현<br/>
          - 연락처 : 010-2247-6408, ssang2247@naver.com<br/><br/>

          3.「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br/>
          - 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)<br/><br/>

          </p>

          <h4 className="font-bold">제12조 고지의 의무</h4>
          <p>
            이  개인정보처리방침은 2024년 9월 1일부터 적용되며, 변경이 있을 시에는 변경 사항의 시행 7일 전부터 웹사이트의 공지사항 또는 별도 공지를 통하여 고지할 것입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControllModal;