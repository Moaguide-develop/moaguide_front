'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState } from 'react';
import { IReport } from '@/types/Diviend';
import { format } from 'date-fns';
interface IReportProps {
  report: IReport[];
}

const Report = ({ report }: IReportProps) => {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용

  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  //
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <div className=" flex flex-row justify-center items-center ">
      <div>
        <div
          className="flex  bg-white w-[40px] h-[40px]  justify-center items-center   z-10 rounded-full mr-[10px]"
          onClick={handlePrev}>
          <Image
            src="/images/product/CaretLeft.svg"
            alt="leftarrow"
            width={20}
            height={20}
          />
        </div>
      </div>

      <Swiper
        onActiveIndexChange={(e: SwiperClass) => setSwiperIndex(e.realIndex)}
        onSwiper={(e: SwiperClass) => {
          setSwiper(e);
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={2}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false // 사용자 상호작용시 슬라이더 일시 정지 비활성
        // }}
        // navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }}
        className="mySwiper flex justify-center">
        {report.map((item) => {
          return (
            <div key={item.id}>
              <SwiperSlide>
                <div className="w-full  max-w-[436px] max-h-[133px] flex flex-row  justify-between px-[20px] py-[20px] border-2 border-gray-200 rounded-md ">
                  <div className=" flex flex-col justify-center items-start ">
                    <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center ">
                      {item.category === 'building' ? <>부동산</> : <>미술품</>}
                    </div>

                    <div className="my-[12px]">{item.title}</div>
                    <div className="text-gray-300">
                      {format(new Date(item.date), 'yyyy.MM.dd')}
                    </div>
                  </div>
                  <div className="w-[132px] h-[93px] rounded-md">
                    <Image
                      src="/images/product/Report.png"
                      alt="Report"
                      width={132}
                      height={93}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>

      <div>
        <div
          className="flex  bg-white w-[40px] h-[40px]  justify-center items-center    z-10 rounded-full ml-[10px]"
          onClick={handleNext}>
          <Image
            src="/images/product/CaretRight.svg"
            alt="rightarrow"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
