'use client';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductSortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const ProductIsdealSort = ({ sort, setSort }: ProductSortProps) => {
  // const [sort, setSort] = useState(filter);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const sorted = searchParams.get('sort');
  console.log(sorted);

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
              setSort('profit');
              handleClick('lastDivide_rate desc');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer desk2:text-sm desk:text-xs
            ${sorted === 'lastDivide_rate desc' || sorted == null ? 'border border-normal text-normal' : 'border border-gray100 text-gray300   '}`}>
            수익률순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'lastDivide_rate desc' || sorted == null ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
          <div
            onClick={() => {
              setSort('inquiry');
              handleClick('views desc');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer desk2:text-sm desk:text-xs
            ${sorted === 'views desc' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300  '}`}>
            조회순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'views desc' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={() => {
              setSort('currentprice');
              handleClick('price desc');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer desk2:text-sm desk:text-xs
            ${sorted === 'price desc' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300  '}`}>
            현재가순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'price desc' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={() => {
              setSort('alphabetical ');
              handleClick('name');
            }}
            className={`flex items-center gap-1 px-[10px] py-2 rounded-[100px] text-body6 cursor-pointer  desk2:text-sm desk:text-xs
            ${sorted === 'name' ? 'border border-normal text-normal' : 'border border-gray100 text-gray300  '}`}>
            가나다순
            <Image
              src="/images/home/news_check.svg"
              alt=""
              className={`${sorted === 'name' ? 'block' : 'hidden'}`}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIsdealSort;
