'use client';

import Container from '@/components/common/Container';
import NavBar from '@/app/product/(product)/detail/NavBar';
import News from '@/app/product/(product)/detail/News';
import BuildingProductDetail from '@/app/product/(product)/detail/building/BuildingProductDetail';
import BuildingProfit from '@/app/product/(product)/detail/building/BuildingProfit';
import Notice from '@/app/product/(product)/detail/Notice';
import Report from '@/app/product/(product)/detail/Report';
import { useState } from 'react';
import { getBuildingProductDetail } from '@/factory/Product/ProductDetail/BuildingProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/app/product/(product)/detail/BookmarkUpdate';
import { BuildingTopDetail } from '@/app/product/(product)/detail/building/BuildingTopDetail';
import dynamic from 'next/dynamic';

const BlurWrapper = dynamic(() => import('@/components/common/BlurWrapper'), {
  ssr: false
});

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
      <BlurWrapper>
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
      </BlurWrapper>
    </div>
  );
};

export default BuildingDetailpage;
