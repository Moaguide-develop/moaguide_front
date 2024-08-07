import { create } from 'zustand';

/**
 * currentCategory : all(전체 -> 기본값), building(부동산), music(음악), 한우(cow), 미술(art), 콘텐츠(contents)
 * subCategory: guide(투자가이드 -> 기본값), analyze(상품분석), view(시황,전망)
 * sort : recently(최신순), popular(인기순)
 */

interface useReportStoreType {
  currentCategory: string;
  setCurrentCategory: (payload: string) => void;
  subCategory: string;
  setSubCategory: (payload: string) => void;
  sort: string;
  setSort: (payload: string) => void;
}

export const useReportStore = create<useReportStoreType>((set) => ({
  currentCategory: 'all',
  subCategory: 'guide',
  sort: 'recently',
  setCurrentCategory: (payload: string) =>
    set(() => ({
      currentCategory: payload
    })),
  setSubCategory: (payload: string) =>
    set(() => ({
      subCategory: payload
    })),
  setSort: (payload: string) =>
    set(() => ({
      sort: payload
    }))
}));
