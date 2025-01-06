import { create } from 'zustand';

interface ToastState {
  open: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  showToast: (message) => set({ open: true, message }),
  hideToast: () => set({ open: false, message: '' })
}));
