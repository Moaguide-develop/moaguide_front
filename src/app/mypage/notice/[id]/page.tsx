import Image from 'next/image';
const NoticeDetailPage = () => {
  return (
    <div className=" max-w-[640px] mx-auto">
      <Image
        src={'/images/detail/CaretLeft.svg'}
        width={24}
        height={24}
        alt="Left Arrow"
        className="mb-[34px] mt-[15px]"
      />
      <div className=" flex flex-col ">
        <div className=" text-base font-bold mb-[12px]">23기 배당금 지급 안내</div>

        <div className=" text-gray-400">2024.06.06</div>

        <div className=" w-full h-[1px] bg-gray-200 my-[20px]" />
        <div className="text-gray-400 mb-[40px]">
          공지자료 내용 안내 노출란입니다. 공지자료 내용 안내 노출란입니다. 공지자료 내용
          안내 노출란입니다. 공지자료 내용 안내 노출란입니다. 공지자료 내용 안내
          노출란입니다. 공지자료 내용 안내 노출란입니다. 공지자료 내용 안내 노출란입니다.
          공지자료 내용 안내 노출란입니다.
        </div>

        <div className=" border-gray-200 rounded-lg border-[1px] flex justify-between px-[20px] py-[16px] mb-[12px]">
          <div className=" flex">
            <Image
              src={'/images/detail/FileText.svg'}
              width={20}
              height={20}
              alt="File Text"
            />
            <div>1호 23기 배당 안내문 1.pdf</div>
          </div>
          <Image
            src={'/images/detail/DownloadSimple.svg'}
            width={20}
            height={20}
            alt="Download Simple"
          />
        </div>
        <div className=" border-gray-200 rounded-lg border-[1px] flex justify-between px-[20px] py-[16px]">
          <div className=" flex">
            <Image
              src={'/images/detail/FileText.svg'}
              width={20}
              height={20}
              alt="File Text"
            />
            <div>2호 23기 배당 안내문 1.pdf</div>
          </div>
          <Image
            src={'/images/detail/DownloadSimple.svg'}
            width={20}
            height={20}
            alt="Download Simple"
          />
        </div>
      </div>
    </div>
  );
};
export default NoticeDetailPage;
