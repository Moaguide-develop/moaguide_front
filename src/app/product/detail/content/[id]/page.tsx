'use client';
import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Report from '@/components/product/detail/Report';
import { useState } from 'react';
import ContentProfit from '@/components/product/detail/content/ContentProfit';
import ContentProductDetail from '@/components/product/detail/content/ContentProductDetail';
import { getContentProductDetail } from '@/factory/Product/ProductDetail/ContentProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/components/product/detail/BookmarkUpdate';
import { ContentTopDetail } from '@/components/product/detail/content/ContentTopDetail';
import dynamic from 'next/dynamic';

const BlurWrapper = dynamic(() => import('@/components/common/BlurWrapper'), {
  ssr: false
});

const ContentDetailpage = (props: { params: { id: string } }) => {
  const [sort, setSort] = useState('profit');
  const url = props.params.id;
  const { data } = getContentProductDetail(props.params.id) || {
    data: null
  };
  const [localData, setLocalData] = useState(data);

  const { handleBookmarkClick } = BookmarkUpdate({ data, localData, setLocalData });

  return (
    <div className="overflow-x-hidden  desk:mx-3">
      <Container>
        <ContentTopDetail
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
          <ContentProfit
            url={url}
            invest={data?.invest as boolean}
            genre={data?.genre as string}
          />
        ) : sort === 'detail' ? (
          <ContentProductDetail
            url={url}
            genre={data?.genre as string}
            name={data?.name}
          />
        ) : undefined}
      </BlurWrapper>
    </div>
  );
};

export default ContentDetailpage;
