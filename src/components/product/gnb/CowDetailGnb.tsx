'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { getMusicProductDetail } from '@/factory/ProductDetail/MusicProductDetail';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { getCowProductDetail } from '@/factory/ProductDetail/CowProductDetail';

const CowDetailGnb = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop() || '';
  const { data } = getCowProductDetail(lastSegment);
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (!localData) {
      setLocalData(data);
    }
  }, [data, localData]);

  const addmutation = useAddBookMark();
  const deletemutation = useDeleteBookMark();

  const handleBookmarkClick = (
    productId: string | undefined,
    bookmark: boolean | undefined
  ) => {
    // 낙관적 업데이트를 위해 로컬 상태를 먼저 변경합니다.
    setLocalData((prevData) =>
      prevData ? { ...prevData, bookmark: !prevData.bookmark } : prevData
    );

    if (!bookmark) {
      addmutation.mutate({ productId, bookmark });
    } else if (bookmark) {
      deletemutation.mutate({ productId });
    }
  };

  return (
    <div>
      <div className="py-[16px] h-[60px] max-w-[1000px] mx-auto flex items-center justify-between sm:px-0 sm:py-3 w-[90%] lg:w-[100%]">
        <Link href={'/'} className="cursor-pointer">
          <img src="/images/product/LeftVector.svg" alt="left" className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-6">
          <div>
            <Image
              src={`${localData?.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
              alt="Bookmark"
              width={24}
              height={24}
              onClick={() => {
                handleBookmarkClick(localData?.productId, localData?.bookmark);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowDetailGnb;
