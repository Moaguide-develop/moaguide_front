import create from 'zustand';

interface LikeState {
  likedByMe: boolean;
  setLikedByMe: (liked: boolean) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  likedByMe: false,
  setLikedByMe: (liked) => {
    localStorage.setItem('likedByMe', JSON.stringify(liked));
    set({ likedByMe: liked });
  },
}));