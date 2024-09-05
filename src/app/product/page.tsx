import Navbar from '@/components/common/Navbar';
import Product from '@/components/product/Product';
import { IProductDetailData, IReport, ISummaryData } from '@/types/Diviend';

const ProductPage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pages = searchParams['page'] || 1;
  console.log(pages);
  const buildingDiviedResponse = await fetch(
    `https://api.moaguide.com/summary/recent/building`,
    {
      cache: 'no-store'
    }
  );

  const buildingReportResponse = await fetch(
    'https://api.moaguide.com/summary/report/building',
    {
      cache: 'no-store'
    }
  );
  const productDetailResponse = await fetch(
    `https://api.moaguide.com/summary/list/all?page=${pages}&size=10&sort=views`,
    {
      next: { revalidate: 300 }
    }
  );

  const buildingDiviedData: ISummaryData = await buildingDiviedResponse.json();

  const buildingReportData: IReport[] = await buildingReportResponse.json();

  const productDetailData: IProductDetailData = await productDetailResponse.json();

  return (
    <div>
      <Navbar />
      <Product
        divide={buildingDiviedData.divide}
        summary={buildingDiviedData.summary}
        report={buildingReportData}
        content={productDetailData.content}
        pageNumber={productDetailData?.pageable?.pageNumber}
        totalPages={productDetailData?.totalPages}
      />
    </div>
  );
};

export default ProductPage;
