import Image from 'next/image';
import Container from '../common/Container';
import { IProductDetailData } from '@/types/Diviend';
import ProductPagenation from './ProductPagenation';
import Link from 'next/link';
import ProductMobilePagenation from './ProductMobilePagenation';
interface IProductContentListProps {
  content: IProductDetailData['content'];
  totalPages: IProductDetailData['totalPages'];
  pageNumber: IProductDetailData['pageable']['pageNumber'];
}
const ProductContentList = ({
  content,
  totalPages,
  pageNumber
}: IProductContentListProps) => {
  console.log(content);
  // product_Id
  return (
    <div>
      <Container>
        <div className="flex flex-row   desk:hidden  md:flex ml-[20px]  ">
          <div className="w-[62px] mr-[16px] ml-[10px] text-gray-500 ">이미지</div>
          <div className="w-[60px] mr-[16px] text-gray-500 ">카테고리</div>
          <div className="w-[100px] mr-[16px] text-gray-500 ">운영 플랫폼</div>
          <div className="w-[260px] mr-[16px] text-gray-500 ">종목 명</div>
          <div className="w-[88px] mr-[34px]  text-gray-500">현재가</div>
          <div className="w-[97px] mr-[24px] text-gray-500 ">시가총액</div>
          <div className="w-[92px] mr-[24px]  text-gray-500 ">배당 수익률</div>
          <div className="w-[24px]  text-gray-500">#</div>
        </div>
      </Container>
      <div className="   desk:hidden  md:flex mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

      <Container>
        <div>
          {content?.map((item) => (
            <div key={item.product_Id} className=" lg:flex  ">
              <Link href={`product/detail/${item.product_Id}`}>
                <div className="flex items-center  h-[110px] ">
                  <div className="flex   desk:ml-[20px] ">
                    <Image
                      src={'/images/product/ProductImage.png'}
                      width={82}
                      height={82}
                      alt="image"
                      className="mr-[16px]"
                    />
                  </div>
                  <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100   desk:hidden  md:flex ">
                    {item.category === 'building' ? '부동산' : '부동산'}
                  </div>
                  <div className="w-[100px] mr-[16px]  text-gray-400   desk:hidden  md:flex ">
                    {item.platform}
                  </div>
                  <div className="w-[260px] mr-[16px] text-lg font-bold   desk:hidden  md:flex ">
                    {item.name}
                  </div>
                  {/* /////   반응형  //////////// */}
                  <div className="flex flex-col  md:hidden  desk:flex  ">
                    <div className="flex mb-[5px]">
                      <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100 ">
                        {item.category === 'building' ? '부동산' : '부동산'}
                      </div>
                      <div className="w-[100px] mr-[16px]  text-gray-400 ">
                        {item.platform}
                      </div>
                    </div>

                    <div className="w-[220px] mr-[16px] text-lg font-bold mb-[5px] ">
                      {item.name}
                    </div>

                    <div className=" flex ">
                      <div className=" ml-[4px] mr-[4px] text-gray-500  ">
                        {item.price.toLocaleString()}원
                      </div>
                      <div className="mr-[16px] text-red-500 ">({item.priceRate}%)</div>
                    </div>
                  </div>

                  {/* ///// */}

                  <div className=" flex flex-col">
                    <div className="w-[88px] mr-[16px] text-gray-500  desk:hidden  md:flex  ">
                      {item.price.toLocaleString()} 원
                    </div>
                    <div className="w-[88px] mr-[16px] text-red-500  desk:hidden  md:flex ">
                      ({item.priceRate}%)
                    </div>
                  </div>
                  <div className="w-[125px] mr-[28px] text-gray-500    desk:hidden  md:flex">
                    {item.totalPrice.toLocaleString()}원
                  </div>
                  <div className="w-[61px] mr-[29px] text-red-500 bg-red-100  rounded-lg flex justify-center items-center desk: ml-auto ">
                    {item.lastDivide_rate}%
                  </div>

                  <Image
                    src={'/images/product/BookmarkWhite.svg'}
                    width={24}
                    height={24}
                    alt="Bookmark"
                    className="  desk:hidden  md:flex"
                  />
                </div>
                <div className="  mt-[20px] mb-[20px] w-atuo h-[0px] border border-[#eceef2]" />
              </Link>
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

export default ProductContentList;
