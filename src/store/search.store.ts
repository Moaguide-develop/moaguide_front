import { create } from 'zustand';

/**
 * 메인페이지에서 실시간 검색 순위 키워드(검색어)를 클릭 할 시
 * 해당 키워드를 search 페이지의 keyword(검색어)로 넘겨주는 역할의 store입니다.
 */

interface useSearchStoreType {
  currentKeyword: string;
  setKeyword: (payload: string) => void;
}

export const useSearchStore = create<useSearchStoreType>((set) => ({
  currentKeyword: '',
  setKeyword: (payload: string) =>
    set(() => ({
      currentKeyword: payload
    }))
}));
