'use client';
import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Report from '@/components/product/detail/Report';
import { useState } from 'react';
import { getArtProductDetail } from '@/factory/Product/ProductDetail/ArtProductDetail';
import ArtProfit from '@/components/product/detail/art/ArtProfit';
import ArtProductDetail from '@/components/product/detail/art/ArtProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/components/product/detail/BookmarkUpdate';
import { ArtTopDetail } from '@/components/product/detail/art/ArtTopDetail';
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

      {sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <ArtProfit url={url} />
      ) : sort === 'detail' ? (
        <ArtProductDetail url={url} />
      ) : undefined}
    </div>
  );
};

export default ArtDetailpage;
