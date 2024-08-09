import { create } from 'zustand';

interface useModalStoreType {
  open: boolean;
  /* eslint-disable no-unused-vars */
  setOpen: (payload: boolean) => void;
  modalType: string;
  setModalType: (payload: string) => void;
}

export const useModalStore = create<useModalStoreType>((set) => ({
  open: false,
  modalType: '',
  setOpen: (payload: boolean) =>
    set(() => ({
      open: payload
    })),
  setModalType: (payload: string) =>
    set(() => ({
      modalType: payload
    }))
}));
