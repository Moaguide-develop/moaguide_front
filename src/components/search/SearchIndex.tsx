'use client';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import SearchRank from './SearchRank';
import useDebounce from '@/hook/useDebounce';
import { getSearchItem } from '@/factory/SearchItem';
import CircleSkeleton from '../skeleton/CircleSkeleton';
import SearchedResultItem from './SearchedResultItem';
import { useSearchStore } from '@/store/search.store';
import { getMainProduct } from '@/factory/MainProduct';

const SearchIndex = () => {
  const { currentKeyword } = useSearchStore();
  const [isFocused, setIsFocused] = useState(false);
  const [keyWord, setKeyWord] = useState(currentKeyword); // 전역 currentKeyword가 존재한다면 우선사용
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedKeyword = useDebounce(keyWord);

  const { data: recommend, isLoading: recommendLoading } = getMainProduct('all');
  const { data, isLoading } = getSearchItem(debouncedKeyword);

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setKeyWord('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="pt-10 flex flex-col  gap-10">
      {keyWord ? null : (
        <div className="text-heading1 text-gray700 flex items-center justify-center">
          찾으시는 상품이 있으신가요?
        </div>
      )}

      <div className="flex items-center justify-center">
        <div
          className={`max-w-[520px] w-full bg-white flex items-center justify-center py-[14px] px-4 rounded-[12px] 
          ${isFocused || keyWord ? 'border-[1.5px] border-normal' : 'border-[1.5px] border-gray100'}
          `}>
          <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={keyWord}
            onChange={handleKeyword}
            type="text"
            placeholder="조각투자 상품 검색"
            className="w-full outline-none text-body2 "
          />
          {keyWord && (
            <div onClick={handleClear} className="cursor-pointer mr-3">
              <img src="/images/search/xcircle.svg" alt="" />
            </div>
          )}
          <div>
            <img src="/images/search/search_icon.svg" alt="" />
          </div>
        </div>
      </div>

      {keyWord ? null : (
        <div>
          <div className="text-heading3 text-gray700">실시간 검색</div>
          <SearchRank setKeyWord={setKeyWord} />
        </div>
      )}

      {keyWord && isLoading && <CircleSkeleton />}
      {keyWord && !isLoading && data && (
        <div>
          {data?.length === 0 ? (
            <div className="text-heading3">
              {' '}
              <span className="text-normal">{debouncedKeyword}</span>에 대한 검색 결과가
              존재하지 않습니다.
            </div>
          ) : (
            <div className="text-heading2">
              <span className="text-gray700">검색 결과</span>{' '}
              <span className="text-normal">{data?.length}개</span>
            </div>
          )}

          <ul
            className={` pb-10 flex flex-col gap-4
          ${data?.length === 0 ? 'mt-4' : 'mt-10'}
          `}>
            {data?.length === 0 && (
              <div>
                <div className="text-title1 pb-5">👀 아래 투자 상품은 어떠신가요?</div>
                {recommend?.map((item, i) => <SearchedResultItem key={i} {...item} />)}
              </div>
            )}
            {data?.map((item, i) => <SearchedResultItem key={i} {...item} />)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchIndex;
