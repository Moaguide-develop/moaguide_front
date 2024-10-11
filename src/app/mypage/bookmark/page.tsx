import Bookmark from '@/components/product/Bookmark';
import { IProductCommon } from '@/types/Diviend';

const BookmarkPage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pages = searchParams['page'] || 1;
  const category = searchParams['category'] || 'all';

  const productBookmarkResponse = await fetch(
    `https://api.moaguide.com/summary/list?category=${category}&subcategory=bookmark&sort=bookmark&page=${pages}&size=10`,
    {
      // next: { revalidate: 300 }
      cache: 'no-store'
    }
  );

  const productBookmarkData: IProductCommon = await productBookmarkResponse.json();

  return (
    <div>
      <Bookmark
        content={productBookmarkData.product}
        pageNumber={productBookmarkData?.pageable?.pageNumber}
        totalPages={productBookmarkData?.totalPages}
      />
    </div>
  );
};

export default BookmarkPage;
