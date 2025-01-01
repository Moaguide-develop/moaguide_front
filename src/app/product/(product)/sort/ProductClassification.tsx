'use client';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductSortProps {
  classification: string;
  setClassification: Dispatch<SetStateAction<string>>;
}

const ProductClassification = ({
  classification,
  setClassification
}: ProductSortProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const sorted = searchParams.get('subcategory');

  const handleClick = (key: string, key2: string) => {
    params.set('subcategory', key);
    params.set('sort', key2);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className="flex items-center gap-[10px] ml-[10px]  ">
        <div className="text-body1 text-gray500  whitespace-nowrap ">대분류</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setClassification('isdeal');
              handleClick('trade', 'lastDivide_rate desc');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer  whitespace-nowrap  
            ${sorted === 'trade' || sorted == null ? 'border border-normal text-normal    ' : 'border border-gray100 text-gray300'}`}>
            거래 가능
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'trade' || sorted == null ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
          <div
            onClick={() => {
              setClassification('recruitment');
              handleClick('start', 'ready');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer  whitespace-nowrap 
            ${sorted === 'start' ? 'border border-normal text-normal  ' : 'border border-gray100 text-gray300'}`}>
            모집중
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'start' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={() => {
              setClassification('toberecruitment');
              handleClick('end', 'end');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer  whitespace-nowrap 
            ${sorted === 'end' ? 'border border-normal text-normal  ' : 'border border-gray100 text-gray300'}`}>
            모집 완료
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'end' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClassification;
