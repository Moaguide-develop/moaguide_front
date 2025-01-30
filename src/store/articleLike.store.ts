import { create } from 'zustand';

interface LikeState {
  likedArticles: Record<number, { liked: boolean; likes: number }>;
  setLikedArticle: (articleId: number, liked: boolean, likes: number) => void;
  getLikedState: (articleId: number) => { liked: boolean; likes: number } | undefined;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedArticles: {},
  setLikedArticle: (articleId, liked, likes) =>
    set((state) => ({
      likedArticles: {
        ...state.likedArticles,
        [articleId]: { liked, likes },
      },
    })),
  getLikedState: (articleId) => get().likedArticles[articleId],
}));