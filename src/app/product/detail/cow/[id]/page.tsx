'use client';
import Container from '@/components/common/Container';
import NavBar from '@/app/product/(product)/detail/NavBar';
import News from '@/app/product/(product)/detail/News';
import Report from '@/app/product/(product)/detail/Report';
import { useState } from 'react';
import { getCowProductDetail } from '@/factory/Product/ProductDetail/CowProductDetail';
import CowProductDetail from '@/app/product/(product)/detail/cow/CowProductDetail';
import CowProfit from '@/app/product/(product)/detail/cow/CowProfit';
import '../../../../plugin';
import { BookmarkUpdate } from '@/app/product/(product)/detail/BookmarkUpdate';
import { CowTopDetail } from '@/app/product/(product)/detail/cow/CowTopDetail';
import dynamic from 'next/dynamic';

const BlurWrapper = dynamic(() => import('@/components/common/BlurWrapper'), {
  ssr: false
});

const CowDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;
  const { data } = getCowProductDetail(props.params.id) || {
    data: null
  };
  const [localData, setLocalData] = useState(data);
  const { handleBookmarkClick } = BookmarkUpdate({ data, localData, setLocalData });

  return (
    <div className="overflow-x-hidden desk:mx-3">
      <Container>
        <CowTopDetail
          data={data}
          localData={localData}
          handleBookmarkClick={handleBookmarkClick}
        />
      </Container>
      <NavBar sort={sort} setSort={setSort} />
      <BlurWrapper>
        {sort === 'news' ? (
          <News />
        ) : sort === 'report' ? (
          <Report />
        ) : sort === 'profit' ? (
          <CowProfit url={url} />
        ) : sort === 'detail' ? (
          <CowProductDetail url={url} />
        ) : undefined}
      </BlurWrapper>
    </div>
  );
};

export default CowDetailpage;
