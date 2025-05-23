'use client';
import React, { useEffect, useState } from 'react';

import PrivacyControllModal from '../../app/signup/(signup)/modal/PrivacyControllModal';
import ServiceControllModal from '../../app/signup/(signup)/modal/ServiceControllModal';
import Image from 'next/image';

const HomeFooter = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handlePrivacyClick = () => {
    setActiveModal('privacy');
  };

  const handleUseClick = () => {
    setActiveModal('service');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeModal]);

  return (
    <div className="bg-bg mx-auto w-full sm:block">
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col justify-start sm:justify-between sm:items-center mt-[52px] py-[30px] w-[90%] lg:w-full mx-auto desk:max-w-[1000px] bg-gradient2 rounded-[12px]">
          <div className="w-[90%] mx-auto">
            <div className="flex justify-center text-white text-body2 text-lg font-bold pb-[20px]">
              모아가이드에서 알려드립니다.
            </div>
            <div className="flex flex-col justify-start text-white text-sm">
              <div>
                1. 모아가이드에서 제공하는 상품정보와 금액은 일치하지 않을 수 있습니다.
                해당 플랫폼에서 상품정보 및 금액을 반드시 확인해 주시기 바랍니다.
              </div>
              <div>
                2. 모아가이드는 고객이 플랫폼에서 구매한 투자 상품에 대해 보증하거나
                별도의 책임을 지지 않으며, 투자상품 거래와 관련한 일체의 책임은 해당
                플랫폼 및 사용자 각자에게 있습니다.
              </div>
              <div>
                3. 고객께서는 투자상품 거래 전 해당 플랫폼의 이용약관을 반드시 확인해
                주시기 바랍니다.
              </div>
              <div>
                4. 모아가이드는 정보통신업을 영위하며 투자 자문업, 투자 일임업 등 고객에
                대한 자산 운용 관련업을 영위하지 않습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center pt-[52px] pb-[42px] w-[90%] lg:w-full mx-auto desk:max-w-[1000px]">
          <div className="flex flex-col gap-6">
            <div>
              <img src="/images/home/footer_logo.svg" alt="" />
            </div>
            <div className="text-heading4 text-gray500">(주)모아가이드</div>
            <div className="text-body2 text-gray400 flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                <div>대표자 : 노상현</div>
                <div className="hidden sm:flex sm:px-2"> | </div>
                <div>주소 : 경기도 수원시 영통구 영통로 498</div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                <div>번호 : 010-2247-6408</div>
                <div className="hidden sm:flex sm:px-2"> | </div>
                <div>이메일 : ssang2247@moaguide.com</div>
              </div>
              <div>사업자등록 번호 : 890-19-01893</div>
              <div>통신판매업 번호 : 2024-수원영통-1533</div>
            </div>
            <div className="hidden sm:flex mt-10 text-[16px] font-normal text-gray700 ">
              Copyright © 2024. MOA GUIDE. All Rights Reserved.
            </div>
          </div>
          <div>
            <div className="hidden sm:flex flex-col md:flex-row gap-3 text-body1 text-gray300 mt-0 sm:mt-[270px]">
              <div className="cursor-pointer" onClick={handlePrivacyClick}>
                개인정보처리방침
              </div>
              <div className="hidden md:block">|</div>
              <div className="cursor-pointer" onClick={handleUseClick}>
                이용약관
              </div>
            </div>
            <div className="flex sm:hidden flex-row gap-3 text-body1 text-gray300 mt-[20px]">
              <div className="cursor-pointer" onClick={handlePrivacyClick}>
                개인정보처리방침
              </div>
              <div>|</div>
              <div className="cursor-pointer" onClick={handleUseClick}>
                이용약관
              </div>
            </div>
            <div className="flex sm:hidden mt-[20px] text-[16px] font-normal text-gray700">
              Copyright © 2024. MOA GUIDE. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] flex  justify-between items-center pb-[20px] sm:flex desk2:hidden ">
        <Image
          src={'/images/home/FotterEntrepreneurshipFoundation.svg'}
          alt="FotterEntrepreneurshipFoundation"
          width={0}
          height={0}
          sizes="100vw"
          className=" sm:w-[150px] lg:w-[200px]  desk2:h-[100px]  sm:h-[100px]"
        />
        <Image
          src={'/images/home/FooterSuwonUniversity.svg'}
          alt="FooterSuwonUniversity"
          width={0}
          height={0}
          sizes="100vw"
          className=" sm:w-[150px] lg:w-[200px] desk2:h-[100px]  sm:h-[100px]"
        />
        <Image
          src={'/images/home/FotterMinistryStartups.svg'}
          alt="FotterMinistryStartups"
          width={0}
          height={0}
          sizes="100vw"
          className=" sm:w-[150px] lg:w-[200px] desk2:h-[100px]  sm:h-[100px]"
        />
        <Image
          src={'/images/home/FooterOpenDataHole.svg'}
          alt="FooterOpenDataHole"
          width={0}
          height={0}
          sizes="100vw"
          className="  sm:w-[70px] lg:w-[100px] desk2:h-[80px]  sm:h-[100px]"
        />
        <Image
          src={'/images/home/FooterSeoulCreativity.svg'}
          alt="FooterSeoulCreativity"
          width={0}
          height={0}
          sizes="100vw"
          className=" sm:w-[150px] lg:w-[200px] desk2:h-[100px]  sm:h-[100px]"
        />
      </div>

      <div className="mx-auto max-w-[1000px] flex justify-center items-center pb-[20px] desk2:flex sm:hidden">
        <div className="flex flex-col ">
          <div className=" mx-auto flex justify-center items-center max-w-[200px] ">
            <Image
              src={'/images/home/FotterEntrepreneurshipFoundation.svg'}
              alt="FotterEntrepreneurshipFoundation"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[150px] h-[100px]"
            />
            <Image
              src={'/images/home/FooterSeoulCreativity.svg'}
              alt="FooterSeoulCreativity"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[150px] h-[100px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <Image
              src={'/images/home/FooterOpenDataHole.svg'}
              alt="FooterOpenDataHole"
              width={0}
              height={0}
              sizes="100vw"
              className="  w-[100px] h-[50px]"
            />
            <Image
              src={'/images/home/FotterMinistryStartups.svg'}
              alt="FotterMinistryStartups"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[150px] h-[100px]"
            />

            <Image
              src={'/images/home/FooterSuwonUniversity.svg'}
              alt="FooterSuwonUniversity"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[130px] h-[100px]"
            />
          </div>
        </div>
      </div>
      {activeModal === 'privacy' && <PrivacyControllModal onClose={closeModal} />}
      {activeModal === 'service' && <ServiceControllModal onClose={closeModal} />}
    </div>
  );
};

export default HomeFooter;
