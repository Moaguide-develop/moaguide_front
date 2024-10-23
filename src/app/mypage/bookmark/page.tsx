import Bookmark from '@/components/product/Bookmark';
import { IProductCommon } from '@/types/Diviend';
import { getToken } from '@/utils/localStorage';
import { cookies } from 'next/headers';
const BookmarkPage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getCookie = (key: string) => {
    return cookies().get(key)?.value;
  };
  const token = getCookie('access_token');
  const pages = searchParams['page'] || 1;
  const category = searchParams['category'] || 'all';

  let productBookmarkData: IProductCommon | null = null;

  try {
    const productBookmarkResponse = await fetch(
      `https://api.moaguide.com/summary/list?category=${category}&subcategory=bookmark&sort=bookmark&page=${pages}&size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        // next: { revalidate: 300 }
        cache: 'no-store'
      }
    );

    if (!productBookmarkResponse.ok) {
      throw new Error('Network response was not ok');
    }

    productBookmarkData = await productBookmarkResponse.json();
    console.log(productBookmarkData);
  } catch (error) {
    console.error('Failed to fetch product bookmark data:', error);
  }

  // const productBookmarkData: IProductCommon = await productBookmarkResponse.json();

  return (
    <div>
      {productBookmarkData ? (
        <Bookmark
          content={productBookmarkData.product}
          pageNumber={productBookmarkData?.pageable?.pageNumber}
          totalPages={productBookmarkData?.totalPages}
        />
      ) : (
        <div>현재 북마크 하신 상품이 없습니다</div>
      )}
    </div>
  );
};

export default BookmarkPage;
