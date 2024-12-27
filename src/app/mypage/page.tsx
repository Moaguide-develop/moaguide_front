'use client';

import MypageHeader from '@/components/mypage/MypageHeader';
import MypageMenu from '@/components/mypage/MypageMenu';

import { useBookmarks } from '@/factory/BookMark';
import useLogout from '@/hook/useLogout';
import useCheckLoginStatus from '@/hook/useCheckLoginStatus';
import { logout } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';
import { getCookie, removeCookie } from '@/utils/cookie';
import { axiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ItemOfInterst } from '@/components/mypage/ItemOfInterest';
import { SubscribedInfo } from '@/utils/subscribedDate';

const Mypage = () => {
  const { handleLogout } = useLogout();
  const { loading: loginLoading } = useCheckLoginStatus();
  const { bookmarks, isLoading: bookmarksLoading } = useBookmarks();
  if (loginLoading || bookmarksLoading) {
    return null;
  }

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] sm:mb-0 w-[90%] mx-auto sm:max-w-[640px]">
      <div>
        <MypageHeader />
      </div>

      <ItemOfInterst bookmarks={bookmarks} />
      <nav>
        <MypageMenu />
      </nav>
      <div
        className="text-gray400 body7 cursor-pointer max-w-max w-full mx-auto mt-10 pb-4 hover:underline"
        onClick={handleLogout}>
        <span className="max-w-max mb-[40px] border-b-gray400 border-b-[1px]  sm:mb-0">
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default Mypage;
