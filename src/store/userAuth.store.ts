import { create } from 'zustand';
import { getCookie } from '@/utils/cookies'; 

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== 'undefined' ? !!getCookie('access_token') : false,
  setIsLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
}));
