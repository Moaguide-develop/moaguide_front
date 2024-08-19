'use client';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface ProductSortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const ProductSort = ({ sort, setSort }: ProductSortProps) => {
  // const [sort, setSort] = useState(filter);

  return (
    <div>
      <div className=" flex items-center gap-[10px] ">
        <div className="text-body1 text-gray500">정렬</div>
        <div className="text-gray200">|</div>
        <div className="flex items-center gap-[6px]">
          <div
            onClick={() => {
              setSort('profit');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'profit' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            수익률순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'profit' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
          <div
            onClick={() => {
              setSort('inquiry');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'inquiry' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            조회순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'inquiry' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={() => {
              setSort('currentprice');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'currentprice' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            현재가순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'currentprice' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={() => {
              setSort('alphabetical ');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer
            ${sort === 'alphabetical ' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300'}`}>
            가나다순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sort === 'alphabetical ' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
