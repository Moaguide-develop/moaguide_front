import { create } from 'zustand';

/**
 * currentNav : home(홈), 최신이슈(new_issue), 조각투자 상품(item), 리포트(report)
 */

interface useNavStoreType {
  currentNav: string;
  setCurrentNav: (payload: string) => void;
}

export const useNavStore = create<useNavStoreType>((set) => ({
  currentNav: 'home',
  setCurrentNav: (payload: string) =>
    set(() => ({
      currentNav: payload
    }))
}));
