import Image from 'next/image';
import Container from '../../common/Container';
import { IProductDealDetailData } from '@/types/Diviend';
import ProductPagenation from '../pagenation/ProductPagenation';
import Link from 'next/link';
import ProductMobilePagenation from '../pagenation/ProductMobilePagenation';
import { CATEGORY } from '@/static/category';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { useState } from 'react';
interface IProductContentListProps {
  content: IProductDealDetailData['product'];
  totalPages: IProductDealDetailData['totalPages'];
  pageNumber: IProductDealDetailData['pageable']['pageNumber'];
}
const ProductDealContentList = ({
  content,
  totalPages,
  pageNumber
}: IProductContentListProps) => {
  // const addmutation = useAddBookMark();
  // const deletemutation = useDeleteBookMark();
  // const [localContent, setLocalContent] = useState(content);

  // const handleBookmarkClick = (productId: string, bookmark: boolean) => {
  //   // 낙관적 업데이트를 위해 로컬 상태를 먼저 변경합니다.
  //   setLocalContent((prevContent) =>
  //     prevContent.map((item) =>
  //       item.product_Id === productId && !bookmark
  //         ? { ...item, bookmark: !bookmark }
  //         : item.product_Id === productId && bookmark
  //           ? { ...item, bookmark: !bookmark }
  //           : item
  //     )
  //   );
  //   if (!bookmark) {
  //     addmutation.mutate({ productId, bookmark });
  //   } else if (bookmark) {
  //     deletemutation.mutate({ productId });
  //   }
  // };

  return (
    <div>
      <Container>
        <div className="flex flex-row   desk:hidden  md:flex ml-[20px]  ">
          <div className="w-[62px] mr-[16px] ml-[10px] text-gray-500 ">이미지</div>
          <div className="w-[60px] mr-[16px] text-gray-500 ">카테고리</div>
          <div className="w-[100px] mr-[16px] text-gray-500 ">운영 플랫폼</div>
          <div className="w-[260px] mr-[16px] text-gray-500 ">종목 명</div>
          <div className="w-[88px] mr-[34px]  text-gray-500">현재가</div>
          <div className="w-[103px] mr-[62px] text-gray-500 ">시가총액</div>
          <div className="w-[92px] mr-[30px]  text-gray-500 ">배당 수익률</div>
          <div className="w-[24px]  text-gray-500">#</div>
        </div>
      </Container>
      <div className="   desk:hidden  md:flex mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

      <Container>
        <div>
          {content?.map((item) => (
            <div key={item.product_Id} className=" lg:flex  ">
              <Link href={`product/detail/${item.category}/${item.product_Id}`}>
                <div className="flex items-center  h-[110px] ">
                  <div className="mr-[10px] desk:ml-[20px] ">
                    <Image
                      src={`https://d2qf2amuam62ps.cloudfront.net/img/${item.product_Id}.jpg`}
                      width={82}
                      height={82}
                      alt="image"
                      className="object-cover w-[82px] h-[82px] rounded-[8px] "
                    />
                  </div>
                  <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100   desk:hidden  md:flex ">
                    {CATEGORY[item.category]}
                  </div>
                  <div className="w-[100px] mr-[16px]  text-gray-400   desk:hidden  md:flex ">
                    {item.platform}
                  </div>
                  <div className="w-[260px] mr-[16px] text-lg font-bold   desk:hidden  md:flex ">
                    {item.name}
                  </div>

                  {/* /////   반응형  //////////// */}
                  <div className="flex-1 flex flex-col  md:hidden  desk:flex  ">
                    <div className="flex mb-[5px]">
                      <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100 ">
                        {CATEGORY[item.category]}
                      </div>
                      <div className="max-w-[80px] mr-[16px]  text-gray-400  whitespace-nowrap  ">
                        {item.platform}
                      </div>
                    </div>

                    <div className="maw-[170px] mr-[16px] text-lg font-bold mb-[5px] line-clamp-2 ">
                      {item.name}
                    </div>

                    <div className=" flex  ">
                      <div className=" ml-[4px] mr-[4px] text-gray-500  ">
                        {item.price.toLocaleString()}원
                      </div>
                      <div
                        className={`mr-[16px] ${
                          item.priceRate > 0
                            ? 'text-red-500'
                            : item.priceRate < 0
                              ? 'text-blue-500'
                              : 'text-gray-500'
                        }`}>
                        {item.priceRate > 0
                          ? `(+${item.priceRate}%)`
                          : item.priceRate < 0
                            ? `(${item.priceRate}%)`
                            : `(0%)`}
                      </div>
                    </div>
                  </div>
                  {/* /////   반응형  //////////// */}

                  <div className=" flex flex-col">
                    <div className="w-[108px] mr-[16px] text-gray-500  desk:hidden  md:flex  ">
                      {item.price.toLocaleString()} 원
                    </div>
                    <div
                      className={`w-[88px] mr-[16px] desk:hidden md:flex  ${
                        item.priceRate > 0
                          ? 'text-red-500'
                          : item.priceRate < 0
                            ? 'text-blue-500'
                            : 'text-gray-500'
                      }`}>
                      (
                      {item.priceRate > 0
                        ? `+${item.priceRate}%`
                        : item.priceRate < 0
                          ? `${item.priceRate}%`
                          : `0%`}
                      )
                    </div>
                  </div>

                  <div className=" w-[140px] mr-[28px] text-gray-500    desk:hidden  md:flex ">
                    {item.totalPrice.toLocaleString()}원
                  </div>
                  <div
                    className={`w-[61px] desk2:mr-[29px] desk:mr-[0px]  rounded-lg flex justify-center items-center desk:ml-auto px-2 ${
                      item.lastDivide_rate > 0
                        ? 'text-red-500 bg-red-100'
                        : item.lastDivide_rate < 0
                          ? 'text-blue-500 bg-blue-100'
                          : 'text-gray-500 bg-gray-100'
                    }`}>
                    {item.lastDivide_rate > 0
                      ? `+${item.lastDivide_rate}%`
                      : item.lastDivide_rate < 0
                        ? `${item.lastDivide_rate}%`
                        : `0%`}
                  </div>

                  <Image
                    src={`${item.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
                    width={24}
                    height={24}
                    alt="Bookmark"
                    className="desk:hidden md:flex cursor-pointer ml-3"
                    // onClick={() => handleBookmarkClick(item.product_Id, item.bookmark)}
                  />
                </div>
              </Link>

              <div className="  mt-[20px] mb-[20px] w-atuo h-[0px] border border-[#eceef2]" />
            </div>
          ))}
        </div>
        <div className="md:block  desk:hidden">
          <ProductPagenation totalPages={totalPages} />
        </div>
        <div className="md:hidden  desk:block">
          <ProductMobilePagenation totalPages={totalPages} />
        </div>
      </Container>
    </div>
  );
};

export default ProductDealContentList;
