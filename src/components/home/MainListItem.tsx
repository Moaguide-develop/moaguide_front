import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/userAuth.store';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { CountupProductView } from '@/factory/ViewCount'; 
import type { MainProductItem } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { useQueryClient } from '@tanstack/react-query';

interface MainListItemProps extends MainProductItem {
  handleBookmarkInvalidate: () => void;
  currentTab: string; 
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
  currentTab, 
}: MainListItemProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const queryClient = useQueryClient();

  const displayedCategory = currentTab === 'all' ? 'all' : category;

  const addBookmarkMutation = useAddBookMark(); 
  const deleteBookmarkMutation = useDeleteBookMark();
  const viewMutation = CountupProductView(); 

  const handleBookmarkClick = () => {
    if (bookmark) {
      deleteBookmarkMutation.mutate(
        { productId: product_Id },
        {
          onSuccess: () => {
            handleBookmarkInvalidate();
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            alert('북마크 삭제가 완료되었습니다.');
  
            if (currentTab === 'all') {
              queryClient.invalidateQueries({ queryKey: ['MainProductLogin', category] });
            } else {
              queryClient.invalidateQueries({ queryKey: ['MainProductLogin', 'all'] });
            }
          },
        }
      );
    } else {
      addBookmarkMutation.mutate(
        { productId: product_Id, bookmark: true },
        {
          onSuccess: () => {
            handleBookmarkInvalidate();
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            alert('북마크 추가가 완료되었습니다.');

            if (currentTab === 'all') {
              queryClient.invalidateQueries({ queryKey: ['MainProductLogin', category] });
            } else {
              queryClient.invalidateQueries({ queryKey: ['MainProductLogin', 'all'] });
            }
          },
        }
      );
    }
  };

  const handleProductClick = () => {
    viewMutation.mutate({ productId: product_Id.toString() }); 
    router.push(`/product/detail/${category}/${product_Id}`);
  };

  const handleLogin = () => {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/sign');
  }

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
            onClick={handleProductClick}
          />
        </div>
        <div
          className="flex-1 flex flex-col gap-[10px] cursor-pointer"
          onClick={handleProductClick}
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
                onClick={handleLogin} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainListItem;