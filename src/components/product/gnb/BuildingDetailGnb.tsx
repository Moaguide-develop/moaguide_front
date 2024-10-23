'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getBuildingProductDetail } from '@/factory/ProductDetail/BuildingProductDetail';
import { useAuthStore } from '@/store/userAuth.store';

const BuildingDetailGnb = () => {
  const router = useRouter();

  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop() || '';
  const { data } = getBuildingProductDetail(lastSegment);
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (!localData) {
      setLocalData(data);
    }
  }, [data, localData]);

  const addmutation = useAddBookMark();
  const deletemutation = useDeleteBookMark();

  const { isLoggedIn } = useAuthStore();
  const handleBookmarkClick = (
    productId: string | undefined,
    bookmark: boolean | undefined
  ) => {
    // 낙관적 업데이트를 위해 로컬 상태를 먼저 변경합니다.
    if (isLoggedIn) {
      setLocalData((prevData) =>
        prevData ? { ...prevData, bookmark: !prevData.bookmark } : prevData
      );

      if (!bookmark) {
        addmutation.mutate({ productId, bookmark });
        alert('북마크 추가가 완료되었습니다');
        window.location.reload();
      } else if (bookmark) {
        deletemutation.mutate({ productId });
        alert('북마크 삭제가 완료되었습니다');
        window.location.reload();
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
      window.location.href = '/sign';
    }
  };

  return (
    <div>
      <div className="py-[16px] h-[60px] max-w-[1000px] mx-auto flex items-center justify-between sm:px-0 sm:py-3 w-[90%] lg:w-[100%]">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <img src="/images/product/LeftVector.svg" alt="left" className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <Image
              src={`${localData?.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
              alt="Bookmark"
              width={24}
              height={24}
              onClick={() => {
                handleBookmarkClick(localData?.product_Id, localData?.bookmark);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetailGnb;
