'use client';
import Container from '@/components/common/Container';
import NavBar from '@/components/product/detail/NavBar';
import News from '@/components/product/detail/News';
import Report from '@/components/product/detail/Report';
import Image from 'next/image';
import { useState } from 'react';
import { getCowProductDetail } from '@/factory/Product/ProductDetail/CowProductDetail';
import CowProductDetail from '@/components/product/detail/cow/CowProductDetail';
import CowProfit from '@/components/product/detail/cow/CowProfit';
import { CATEGORY } from '@/static/category';
import Link from 'next/link';
import '../../../../plugin';
import { BookmarkUpdate } from '@/components/product/detail/BookmarkUpdate';
import { CowTopDetail } from '@/components/product/detail/cow/CowTopDetail';

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

      {sort === 'news' ? (
        <News />
      ) : sort === 'report' ? (
        <Report />
      ) : sort === 'profit' ? (
        <CowProfit url={url} />
      ) : sort === 'detail' ? (
        <CowProductDetail url={url} />
      ) : undefined}
    </div>
  );
};

export default CowDetailpage;
