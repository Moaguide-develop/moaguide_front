import { create } from 'zustand';

interface ArticleViewState {
  articleViews: Record<number, number>;
  setArticleView: (articleId: number, views: number) => void;
  getArticleView: (articleId: number) => number | undefined;
}

export const useViewStore = create<ArticleViewState>((set, get) => ({
  articleViews: {},

  setArticleView: (articleId, views) =>
    set((state) => ({
      articleViews: {
        ...state.articleViews,
        [articleId]: views,
      },
    })),

  getArticleView: (articleId) => get().articleViews[articleId],
}));