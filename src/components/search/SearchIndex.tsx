import React from 'react';
import SearchRank from './SearchRank';

const SearchIndex = () => {
  return (
    <div className="pt-10 flex flex-col  gap-10">
      <div className="text-heading1 text-gray700 flex items-center justify-center">
        찾으시는 상품이 있으신가요?
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-[520px] w-full bg-white flex items-center justify-center py-[14px] px-4 rounded-[12px] border-[1.5px] border-gray100">
          <input
            type="search"
            placeholder="조각투자 상품 검색"
            className="w-full outline-none text-body2 "
          />
          <img src="/images/search/search_icon.svg" alt="" />
        </div>
      </div>

      <div>
        <div className="text-heading3 text-gray700">실시간 검색</div>
        <SearchRank />
      </div>
    </div>
  );
};

export default SearchIndex;
