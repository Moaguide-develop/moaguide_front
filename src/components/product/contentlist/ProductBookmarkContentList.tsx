import Image from 'next/image';
import Container from '@/components/common/Container';
import { IProductDealDetailData } from '@/types/Diviend';
import ProductPagenation from '../pagenation/ProductPagenation';
import Link from 'next/link';
import ProductMobilePagenation from '../pagenation/ProductMobilePagenation';
import { CATEGORY } from '@/static/category';

interface IProductContentListProps {
  content: IProductDealDetailData['product'];
  totalPages: IProductDealDetailData['totalPages'];
  pageNumber: IProductDealDetailData['pageable']['pageNumber'];
}
const ProductBookmarkContentList = ({
  content,
  totalPages
}: IProductContentListProps) => {
  return (
    <div>
      <Container>
        <div className="flex flex-row   desk:hidden  md:flex ml-[10px]  ">
          <div className="w-[62px] mr-[16px] ml-[10px] text-gray-500 ">이미지</div>
          <div className="w-[60px] mr-[16px] text-gray-500 ">카테고리</div>
          <div className="w-[100px] mr-[16px] text-gray-500 ">운영 플랫폼</div>
          <div className="w-[260px] mr-[16px] text-gray-500 ">종목 명</div>
          {/* <div className="w-[88px] mr-[34px]  text-gray-500">현재가</div>
          <div className="w-[103px] mr-[62px] text-gray-500 ">시가총액</div>
          <div className="w-[92px] mr-[30px]  text-gray-500 ">배당 수익률</div> */}
          {/* <div className="flex-1 w-[24px]  mr-[40px] flex justify-end text-gray-500">
            #
          </div> */}
        </div>
      </Container>
      <div className="   desk:hidden  md:flex mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

      <Container>
        <div>
          {content?.map((item) => (
            <div
              key={item.product_Id}
              className=" lg:flex  "
              onClick={() => {
                if (item.sale) {
                  alert('현재는 매각이 완료 된 상품입니다');
                  // console.log(item.sale)
                  window.location.reload();
                }
              }}>
              <Link href={`/product/detail/${item.category}/${item.product_Id}`}>
                <div className="flex items-center  h-[110px] ">
                  <div className="mr-[10px] desk:ml-[10px] ">
                    <Image
                      src={`https://d2qf2amuam62ps.cloudfront.net/img/${item.product_Id}.jpg`}
                      width={82}
                      height={82}
                      alt="image"
                    />
                  </div>
                  <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100   desk:hidden  md:flex ">
                    {CATEGORY[item.category]}
                  </div>
                  <div className="w-[100px] mr-[16px]  text-gray-400   desk:hidden  md:flex ">
                    {item.platform}
                  </div>
                  <div className=" w-[300px] mr-[16px] text-lg font-bold   desk:hidden  md:flex ">
                    {item.name}
                  </div>

                  {/* /////   반응형  //////////// */}
                  <div className="flex-1 flex flex-col  md:hidden  desk:flex  ">
                    <div className="flex mb-[5px]">
                      <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100 ">
                        {CATEGORY[item.category]}
                      </div>
                      <div className="max-w-[80px] mr-[16px]  text-gray-400 ">
                        {item.platform}
                      </div>
                    </div>

                    <div className="maw-[170px] mr-[16px] text-lg font-bold mb-[5px] ">
                      {item.name}
                    </div>
                  </div>
                </div>
              </Link>
              {/* <div className=" mr-[20px]  flex items-center justify-end">
                <Image
                  src={`${item.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
                  width={24}
                  height={24}
                  alt="Bookmark"
                  className="desk:hidden md:flex cursor-pointer ml-3  "
                  // onClick={() => handleBookmarkClick(item.product_Id, item.bookmark)}
                />
              </div> */}
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

export default ProductBookmarkContentList;
