// MainListItem.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/userAuth.store';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import type { MainProductItem } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';

interface MainListItemProps extends MainProductItem {
  handleBookmarkInvalidate: () => void;
}

const MainListItem = ({
  product_Id,
  category,
  platform,
  name,
  price,
  priceRate,
  lastDivide_rate,
  bookmark,
  handleBookmarkInvalidate,
}: MainListItemProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const addBookmarkMutation = useAddBookMark(); 
  const deleteBookmarkMutation = useDeleteBookMark();

  const handleBookmarkClick = () => {
    if (bookmark) {
      deleteBookmarkMutation.mutate(
        { productId: product_Id },
        {
          onSuccess: () => {
            handleBookmarkInvalidate();
          },
        }
      );
    } else {
      addBookmarkMutation.mutate(
        { productId: product_Id, bookmark: true },
        {
          onSuccess: () => {
            handleBookmarkInvalidate();
          },
        }
      );
    }
  };

  return (
    <div className="mt-5 pb-5 border-b border-gray100">
      <div className="flex gap-4 sm:gap-5">
        <div>
          <Image
            src={`https://d2qf2amuam62ps.cloudfront.net/img/${product_Id}.jpg`}
            width={82}
            height={82}
            alt="Product Image"
            className="rounded-[8px] object-cover w-[82px] h-[82px] cursor-pointer"
            onClick={() => router.push(`/product/detail/${category}/${product_Id}`)}
          />
        </div>
        <div
          className="flex-1 flex flex-col gap-[10px] cursor-pointer"
          onClick={() => router.push(`/product/detail/${category}/${product_Id}`)}
        >
          <div className="flex items-center gap-2">
            <div className="text-caption3 sm:text-caption3 text-gray400 p-[4px] sm:p-[6px] bg-bg rounded-[4px] flex items-center justify-center">
              {formatCategory(category)}
            </div>
            <div className="text-caption3 sm:text-body7 text-gray300 ">{platform}</div>
          </div>
          <div className="text-body6 sm:text-body1">{name}</div>
          <div className="flex items-center gap-[6px] text-caption3 sm:text-body7">
            <div className=" text-gray400">{price.toLocaleString()}원</div>
            <div className={`${priceRate > 0 ? 'text-error' : 'text-success'}`}>
              {'('}
              {`${priceRate > 0 ? '+' : ''}`} {priceRate}%{')'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-1 sm:p-[6px] bg-error bg-opacity-10 text-error text-caption3 sm:text-body7 rounded-[4px]">
            {lastDivide_rate}%
          </div>
          <div className="cursor-pointer">
            {isLoggedIn ? (
              <img
                src={bookmark ? '/images/product/BookmarkSimple.svg' : '/images/home/bookmark.svg'}
                alt="Bookmark"
                className="w-[24px] h-[24px]"
                onClick={handleBookmarkClick} 
              />
            ) : (
              <img
                src="/images/home/bookmark.svg"
                alt="Bookmark"
                className="w-[24px] h-[24px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainListItem;