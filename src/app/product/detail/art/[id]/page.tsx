'use client';
import Container from '@/components/common/Container';
import NavBar from '@/app/product/(product)/detail/NavBar';
import News from '@/app/product/(product)/detail/News';
import Report from '@/app/product/(product)/detail/Report';
import { useState } from 'react';
import { getArtProductDetail } from '@/factory/Product/ProductDetail/ArtProductDetail';
import ArtProfit from '@/app/product/(product)/detail/art/ArtProfit';
import ArtProductDetail from '@/app/product/(product)/detail/art/ArtProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/app/product/(product)/detail/BookmarkUpdate';
import { ArtTopDetail } from '@/app/product/(product)/detail/art/ArtTopDetail';
import dynamic from 'next/dynamic';

const BlurWrapper = dynamic(() => import('@/components/common/BlurWrapper'), {
  ssr: false
});

const ArtDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;
  const { data } = getArtProductDetail(props.params.id) || { data: null };
  const [localData, setLocalData] = useState(data);
  const { handleBookmarkClick } = BookmarkUpdate({ data, localData, setLocalData });

  return (
    <div className="overflow-x-hidden   desk:mx-3">
      <Container>
        <ArtTopDetail
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
          <ArtProfit url={url} />
        ) : sort === 'detail' ? (
          <ArtProductDetail url={url} />
        ) : undefined}
      </BlurWrapper>
    </div>
  );
};

export default ArtDetailpage;
