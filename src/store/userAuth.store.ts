import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false,
  setIsLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
}));
