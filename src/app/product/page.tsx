import Product from '@/components/product/Product';
import { SummaryData } from '@/types/Diviend';

const ProductPage = async () => {
  const response = await fetch(`https://api.moaguide.com/summary/recent/building`, {
    cache: 'no-store'
  });
  const data: SummaryData = await response.json();
  console.log(data);

  return <Product divide={data.divide} summary={data.summary} />;
};

export default ProductPage;
