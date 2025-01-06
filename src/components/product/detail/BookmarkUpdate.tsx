import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { useAuthStore } from '@/store/userAuth.store';
import { useEffect } from 'react';
import { ProductDetail } from '@/types/ProductType';

export interface BookmarkUpdateProps<T extends ProductDetail> {
  data: T | undefined;
  localData: T | undefined;
  setLocalData: React.Dispatch<React.SetStateAction<T | undefined>>;
}

export const BookmarkUpdate = <T extends ProductDetail>({
  data,
  localData,
  setLocalData
}: BookmarkUpdateProps<T>) => {
  useEffect(() => {
    if (!localData) {
      setLocalData(data);
    }
  }, [data, localData, setLocalData]);

  const addmutation = useAddBookMark();
  const deletemutation = useDeleteBookMark();
  const { isLoggedIn } = useAuthStore();

  const handleBookmarkClick = (
    productId: string | undefined,
    bookmark: boolean | undefined
  ) => {
    if (isLoggedIn) {
      setLocalData((prevData) =>
        prevData ? { ...prevData, bookmark: !prevData.bookmark } : prevData
      );

      if (!bookmark) {
        addmutation.mutate({ productId, bookmark });
        alert('북마크 추가가 완료되었습니다.');
        window.location.reload();
      } else if (bookmark) {
        deletemutation.mutate({ productId });
        alert('북마크 삭제가 완료되었습니다.');
        window.location.reload();
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
      window.location.href = '/sign';
    }
  };

  return { handleBookmarkClick };
};
