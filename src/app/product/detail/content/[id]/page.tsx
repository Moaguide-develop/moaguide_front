'use client';
import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Report from '@/components/product/detail/Report';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CATEGORY } from '@/static/category';
import ContentProfit from '@/components/product/detail/content/ContentProfit';
import ContentProductDetail from '@/components/product/detail/content/ContentProductDetail';
import { getContentProductDetail } from '@/factory/ProductDetail/ContentProductDetail';
import Link from 'next/link';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { useAuthStore } from '@/store/userAuth.store';
const ContentDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;

  const { data, isLoading, isError } = getContentProductDetail(props.params.id);
  console.log(data?.genre);
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
      } else if (bookmark) {
        deletemutation.mutate({ productId });
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
      window.location.href = '/sign';
    }
  };

  return (
    <div className="overflow-x-hidden  desk:mx-3">
      <Container>
        <div className="flex justify-between md:flex-row desk:flex-col ">
          <div className="flex desk2:justify-start desk:justify-center desk:mb-[40px] ">
            <Image
              src={`https://d2qf2amuam62ps.cloudfront.net/img/${data?.productId}.jpg`}
              width={181}
              height={181}
              alt="Profile Image"
              className="object-cover w-[181px] h-[181px] rounded-[8px] "
            />

            <div className="desk:hidden  desk2:flex flex-col ml-[28px] ">
              <div className="flex">
                <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center mb-[13px] ">
                  {CATEGORY[data?.category as string]}
                </div>
                <div className="text-gray-400 ml-[3px]">{data?.platform}</div>
              </div>

              <div className="w-80 text-black text-2xl font-bold mb-[60px] ">
                {data?.name}
              </div>

              <div className="desk2:flex  desk:hidden">
                <Link href={data?.link || '#'}>
                  <div className=" w-[180px] h-[49px] flex justify-center items-center border-2 border-gray-200 rounded-xl">
                    <div>해당 플랫폼으로 이동</div>
                    <Image
                      src="/images/detail/CaretRight.svg"
                      width={16}
                      height={16}
                      alt="Right Arrow"
                    />
                  </div>
                </Link>
                <div
                  className={` desk2:flex desk:hidden ml-[6px] w-[118px] h-[49px] justify-center items-center border-2 ${localData?.bookmark ? `border-purple-500` : `border-gray-200`}  rounded-xl cursor-pointer `}
                  onClick={() => {
                    handleBookmarkClick(localData?.productId, localData?.bookmark);
                  }}>
                  <div
                    className={` ${localData?.bookmark ? `text-purple-500 font-bold ` : `text-black `}mr-1`}>
                    관심 종목
                  </div>
                  <Image
                    src={`${localData?.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
                    width={16}
                    height={16}
                    alt="BookMark"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="desk2:hidden  desk:flex  flex-col">
            <div className="flex flex-col desk2:ml-[28px] desk:ml-[5px] ">
              <div className="flex">
                <div className="bg-gray-200 text-gray-400  rounded-md w-[54px] h-[26px] flex justify-center items-center mb-[13px] ">
                  {CATEGORY[data?.category as string]}
                </div>
                <div className="text-gray-400 ml-[3px]">{data?.platform}</div>
              </div>

              <div className="w-80 text-black text-2xl font-bold desk2:mb-[60px] desk:mb-[20px] ">
                {data?.name}
              </div>
            </div>
          </div>

          <div className="flex flex-col  desk2:justify-start desk2:items-start  desk:justify-center desk:items-center    ">
            <div className="flex w-full desk:max-w-[360px]  md:w-[300px] justify-between ">
              <div className="text-gray-400">모집금액</div>
              <div className="flex flex-row ">
                <div>{data?.totalPrice.toLocaleString()}원</div>
                {/* <div className="text-red-500 "> ({data?.priceRate}%)</div> */}
              </div>
            </div>

            <div className="flex mt-[10px]  w-full desk:max-w-[360px]  md:w-[300px] justify-between ">
              <div className="text-gray-400">모집률</div>
              <div>{data?.rate.toLocaleString()}%</div>
            </div>

            <div className="flex mt-[10px]  w-full desk:max-w-[360px]  md:w-[300px] justify-between ">
              <div className="text-gray-400">시가총액</div>
              <div>{data?.totalPrice.toLocaleString()}원</div>
            </div>

            <div className="flex mt-[10px]  w-full desk:max-w-[360px]  md:w-[300px] justify-between ">
              <div className="text-gray-400">모집기간</div>
              <div className="">~{data?.date}까지</div>
            </div>

            <div className="flex mt-[10px]  w-full desk:max-w-[360px]  md:w-[300px] justify-between ">
              <div className="text-gray-400">최소투자금</div>
              <div>{data?.lowPrice.toLocaleString()}원</div>
            </div>
          </div>

          <div className="desk2:hidden  desk:flex  justify-center mt-[20px] ">
            <Link href={data?.link || '#'}>
              <div className=" desk:w-[300px] desk2:w-[380px] h-[49px] flex justify-center items-center border-2 border-gray-200 rounded-xl">
                <div>해당 플랫폼으로 이동</div>
                <Image
                  src="/images/detail/CaretRight.svg"
                  width={16}
                  height={16}
                  alt="Right Arrow"
                />
              </div>
            </Link>
          </div>
        </div>
      </Container>
      <NavBar sort={sort} setSort={setSort} />

      {sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <ContentProfit
          url={url}
          invest={data?.invest as boolean}
          genre={data?.genre as string}
        />
      ) : sort === 'detail' ? (
        <ContentProductDetail url={url} genre={data?.genre as string} />
      ) : undefined}
    </div>
  );
};

export default ContentDetailpage;
