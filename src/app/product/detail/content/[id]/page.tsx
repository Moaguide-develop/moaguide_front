'use client';
import Container from '@/components/common/Container';
import NavBar from '@/app/product/(product)/detail/NavBar';
import News from '@/app/product/(product)/detail/News';
import Report from '@/app/product/(product)/detail/Report';
import { useState } from 'react';
import ContentProfit from '@/app/product/(product)/detail/content/ContentProfit';
import ContentProductDetail from '@/app/product/(product)/detail/content/ContentProductDetail';
import { getContentProductDetail } from '@/factory/Product/ProductDetail/ContentProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/app/product/(product)/detail/BookmarkUpdate';
import { ContentTopDetail } from '@/app/product/(product)/detail/content/ContentTopDetail';
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

  const sortComponents: { [key: string]: JSX.Element } = {
    news: <News />,
    report: <Report />,
    profit: (
      <ContentProfit
        url={url}
        invest={data?.invest as boolean}
        genre={data?.genre as string}
      />
    ),
    detail: (
      <ContentProductDetail url={url} genre={data?.genre as string} name={data?.name} />
    )
  };

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

      <BlurWrapper>{sortComponents[sort]}</BlurWrapper>
    </div>
  );
};

export default ContentDetailpage;
