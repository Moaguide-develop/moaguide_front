import create from 'zustand';

interface LikeState {
  likedArticles: Record<number, boolean>; 
  setLikedArticle: (articleId: number, liked: boolean) => void;
  getLikedState: (articleId: number) => boolean | undefined;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedArticles: {},
  setLikedArticle: (articleId, liked) =>
    set((state) => ({
      likedArticles: {
        ...state.likedArticles,
        [articleId]: liked,
      },
    })),
  getLikedState: (articleId) => get().likedArticles[articleId],
}));