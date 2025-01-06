'use client';
import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Report from '@/components/product/detail/Report';
import { useState } from 'react';
import { getMusicProductDetail } from '@/factory/Product/ProductDetail/MusicProductDetail';
import MusicProfit from '@/components/product/detail/music/MusicProfit';
import MusicProductDetail from '@/components/product/detail/music/MusicProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/components/product/detail/BookmarkUpdate';
import { MusicTopDetail } from '@/components/product/detail/music/MusicTopDetail';
import dynamic from 'next/dynamic';

const BlurWrapper = dynamic(() => import('@/components/common/BlurWrapper'), {
  ssr: false
});

const MusicDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;
  const { data } = getMusicProductDetail(props.params.id) || {
    data: null
  };
  const [localData, setLocalData] = useState(data);
  const { handleBookmarkClick } = BookmarkUpdate({ data, localData, setLocalData });

  return (
    <div className="overflow-x-hidden desk:mx-3">
      <Container>
        <MusicTopDetail
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
          <MusicProfit url={url} />
        ) : sort === 'detail' ? (
          <MusicProductDetail />
        ) : undefined}
      </BlurWrapper>
    </div>
  );
};

export default MusicDetailpage;
