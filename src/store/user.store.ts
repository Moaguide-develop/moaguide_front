// src/store/user.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserInfo {
  memberEmail: string;
  memberNickName: string;
  memberPhone: string;
  subscribe: string;
}

interface IMember {
  member: IUserInfo;
  setMember: (userInfo: IUserInfo) => void;
  clearMember: () => void;
}

export const useMemberStore = create(
  persist<IMember>(
    (set) => ({
      member: {
        memberEmail: '',
        memberNickName: '',
        memberPhone: '',
        subscribe: ''
      },
      setMember: (userInfo: IUserInfo) => set({ member: userInfo }),
      clearMember: () => set({
        member: {
          memberEmail: '',
          memberNickName: '',
          memberPhone: '',
          subscribe: ''
        }
      }),
    }),
    {
      name: 'userInfo'
    }
  )
);
