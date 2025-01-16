'use client';
import Container from '@/components/common/Container';
import NavBar from '@/app/product/(product)/detail/NavBar';
import News from '@/app/product/(product)/detail/News';
import Report from '@/app/product/(product)/detail/Report';
import { useState } from 'react';
import { getMusicProductDetail } from '@/factory/Product/ProductDetail/MusicProductDetail';
import MusicProfit from '@/app/product/(product)/detail/music/MusicProfit';
import MusicProductDetail from '@/app/product/(product)/detail/music/MusicProductDetail';
import '../../../../plugin';
import { BookmarkUpdate } from '@/app/product/(product)/detail/BookmarkUpdate';
import { MusicTopDetail } from '@/app/product/(product)/detail/music/MusicTopDetail';
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

  const sortComponents: { [key: string]: JSX.Element } = {
    news: <News />,
    report: <Report />,
    profit: <MusicProfit url={url} />,
    detail: <MusicProductDetail />
  };

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
      <BlurWrapper>{sortComponents[sort]}</BlurWrapper>
    </div>
  );
};

export default MusicDetailpage;
