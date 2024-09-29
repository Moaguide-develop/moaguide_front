import Navbar from '@/components/common/Navbar';
import Product from '@/components/product/Product';
import {
  IProductCommon,
  IProductDealDetailData,
  IProductRecruitmentData,
  IReport,
  ISummaryData
} from '@/types/Diviend';

const ProductPage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pages = searchParams['page'] || 1;
  const subcategory = searchParams['subcategory'] || 'trade';
  const sort = searchParams['sort'] || 'lastDivide_rate desc';
  const category = searchParams['category'] || 'all';
  console.log(pages);
  const buildingDiviedResponse = await fetch(`https://api.moaguide.com/summary`, {
    cache: 'no-store'
  });

  const buildingReportResponse = await fetch(
    'https://api.moaguide.com/summary/report/building',
    {
      cache: 'no-store'
    }
  );
  const productDetailResponse = await fetch(
    `https://api.moaguide.com/summary/list?category=${category}&subcategory=${subcategory}&sort=${sort}&page=${pages}&size=10`,
    {
      next: { revalidate: 300 }
    }
  );

  const buildingDiviedData: ISummaryData = await buildingDiviedResponse.json();

  const buildingReportData: IReport[] = await buildingReportResponse.json();

  const productDetailData: IProductCommon = await productDetailResponse.json();
  console.log(productDetailData);
  return (
    <div>
      <Navbar />
      <Product
        divide={buildingDiviedData.divide}
        summary={buildingDiviedData.summary}
        report={buildingReportData}
        content={productDetailData.product}
        pageNumber={productDetailData?.pageable?.pageNumber}
        totalPages={productDetailData?.totalPages}
      />
    </div>
  );
};

export default ProductPage;
