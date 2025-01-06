'use client';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductSortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const ProductRecruitmentSort = ({ sort, setSort }: ProductSortProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const sorted = searchParams.get('sort');

  const handleClick = (key: string) => {
    params.set('sort', key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className="flex items-center gap-[10px] ml-[10px] ">
        <div className="text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('profit');
              handleClick('ready');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sorted === 'ready' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            공모 예정
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'ready' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
          <div
            onClick={() => {
              setSort('inquiry');
              handleClick('start');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sorted === 'start' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            공모 진행중
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'start' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecruitmentSort;
