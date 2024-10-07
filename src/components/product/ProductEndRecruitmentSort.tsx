'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductSortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const ProductEndRecruitmentSort = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const sorted = searchParams.get('sort');

  const [sort, setSort] = useState('end');

  const handleClick = (key: string) => {
    params.set('sort', key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className="flex items-center gap-[10px] ml-[20px] ">
        <div className="text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('end');
              handleClick('end');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sorted === 'end' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            정산 대기중
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'end' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
          <div
            onClick={() => {
              setSort('finish');
              handleClick('finish');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sorted === 'finish' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            정산 완료
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'finish' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEndRecruitmentSort;
