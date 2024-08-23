import Image from 'next/image';
import Container from '../common/Container';
import { IProductDetailData } from '@/types/Diviend';
import ProductPagenation from './ProductPagenation';
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
  const MOCK = {
    summary: [
      {
        product_Id: 'mock',
        category: '부동산',
        platfrom: '모아가이드',
        name: '압구정 커머스 빌딩',
        price: 1233,
        priceRate: 0.5,
        totalPrice: '10,000,000',
        lastDivide_rate: 12.23
      },
      {
        product_Id: 'Mock2',
        category: '부동산',
        platfrom: '모아가이드',
        name: '롯데 타워 시그니엘',
        price: 1232,
        priceRate: 0.8,
        totalPrice: '20,000,000',
        lastDivide_rate: 12.84
      },
      {
        product_Id: 'Mock3',
        category: '부동산',
        platfrom: '모아가이드',
        name: '롯데 타워 시그니엘',
        price: 1232,
        priceRate: 0.8,
        totalPrice: '20,000,000',
        lastDivide_rate: 12.84
      },
      {
        product_Id: 'Mock4',
        category: '부동산',
        platfrom: '모아가이드',
        name: '롯데 타워 시그니엘',
        price: 1232,
        priceRate: 0.8,
        totalPrice: '20,000,000',
        lastDivide_rate: 12.84
      }
    ],
    page: 3,
    total: 3,
    size: 2
  };

  return (
    <div>
      <Container>
        <div className="flex flex-row   desk:hidden  md:flex">
          <div className="w-[62px] mr-[16px] ml-[10px] text-gray-500 ">이미지</div>
          <div className="w-[60px] mr-[16px] text-gray-500 ">카테고리</div>
          <div className="w-[100px] mr-[16px] text-gray-500 ">운영 플랫폼</div>
          <div className="w-[260px] mr-[16px] text-gray-500 ">종목 명</div>
          <div className="w-[88px] mr-[16px]  text-gray-500">현재가</div>
          <div className="w-[97px] mr-[16px] text-gray-500 ">시가총액</div>
          <div className="w-[92px] mr-[16px]  text-gray-500 ">배당 수익률</div>
          <div className="w-[24px]  text-gray-500">#</div>
        </div>
      </Container>
      <div className=" mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

      <Container>
        <div>
          {content?.map((item) => (
            <div key={item.product_Id} className="desk:hidden md:block">
              <div className="flex items-center ">
                <Image
                  src={'/images/product/ProductImage.png'}
                  width={82}
                  height={82}
                  alt="image"
                  className="mr-[16px]"
                />

                <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100 ">
                  {item.category === 'building' ? '부동산' : '부동산'}
                </div>
                <div className="w-[100px] mr-[16px]  text-gray-400 ">{item.platform}</div>
                <div className="w-[260px] mr-[16px] text-lg font-bold ">{item.name}</div>
                <div className=" flex flex-col">
                  <div className="w-[88px] mr-[16px] text-gray-500  ">{item.price}</div>
                  <div className="w-[88px] mr-[16px] text-red-500 ">
                    ({item.priceRate}%)
                  </div>
                </div>
                <div className="w-[97px] mr-[28px] text-gray-500 ">{item.totalPrice}</div>
                <div className="w-[61px] mr-[29px] text-red-500 bg-red-100  rounded-lg flex justify-center items-center ">
                  {item.lastDivide_rate}%
                </div>

                <Image
                  src={'/images/product/BookmarkWhite.svg'}
                  width={24}
                  height={24}
                  alt="Bookmark"
                />
              </div>
              <div className=" mt-[20px] mb-[20px] w-atuo h-[0px] border border-[#eceef2]" />
            </div>
          ))}
        </div>

        <ProductPagenation totalPages={totalPages} />
      </Container>
    </div>
  );
};

export default ProductContentList;
