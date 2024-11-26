'use client';

import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import BuildingProductDetail from '@/components/product/detail/building/BuildingProductDetail';
import BuildingProfit from '@/components/product/detail/building/BuildingProfit';
import Notice from '@/components/product/detail/Notice';
import Report from '@/components/product/detail/Report';
import { useState } from 'react';
import { getBuildingProductDetail } from '@/factory/Product/ProductDetail/BuildingProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/components/product/detail/BookmarkUpdate';
import { BuildingTopDetail } from '@/components/product/detail/building/BuildingTopDetail';

const BuildingDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;
  const { data } = getBuildingProductDetail(props.params.id) || {
    data: null
  };
  const [localData, setLocalData] = useState(data);
  const { handleBookmarkClick } = BookmarkUpdate({ data, localData, setLocalData });

  return (
    <div className="overflow-x-hidden desk:mx-3">
      <Container>
        <BuildingTopDetail
          data={data}
          localData={localData}
          handleBookmarkClick={handleBookmarkClick}
        />
      </Container>
      <NavBar sort={sort} setSort={setSort} />

      {sort === 'public' ? (
        <Notice />
      ) : sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <BuildingProfit url={url} />
      ) : sort === 'detail' ? (
        <BuildingProductDetail
          url={url}
          rentType={data?.rentType}
          stayType={data?.stayType}
        />
      ) : undefined}
    </div>
  );
};

export default BuildingDetailpage;
