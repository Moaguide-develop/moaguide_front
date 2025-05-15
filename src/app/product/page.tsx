import Navbar from '@/components/common/Navbar';
import Product from './(product)/Product';
import { IProductCommon, IReport, ISummaryData } from '@/types/Diviend';
import { getCookie } from '@/utils/serverCookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://moaguide.n-e.kr';

const ProductPage = async ({
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = getCookie('access_token') || '';

  const pages = searchParams['page'] || 1;
  const subcategory = searchParams['subcategory'] || 'trade';
  const sort = searchParams['sort'] || 'lastDivide_rate desc';
  const category = searchParams['category'] || 'all';

  const buildingDiviedResponse = await fetch(`${API_BASE_URL}/summary`, {
    cache: 'no-store'
  });

  const buildingReportResponse = await fetch(`${API_BASE_URL}/summary/report/building`, {
    cache: 'no-store'
  });
  const productDetailResponse = await fetch(
    `${API_BASE_URL}/summary/list?category=${category}&subcategory=${subcategory}&sort=${sort}&page=${pages}&size=10`,
    {
      headers: {
        Authorization: `Bearer ${token} `
      },
      // next: { revalidate: 300 }
      cache: 'no-store'
    }
  );

  const buildingDiviedData: ISummaryData = await buildingDiviedResponse.json();

  const buildingReportData: IReport[] = await buildingReportResponse.json();

  const productDetailData: IProductCommon = await productDetailResponse.json();
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
