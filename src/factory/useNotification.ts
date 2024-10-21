import { axiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchNotificationList = async ({ pageParam = null }) => {
  const url = pageParam ? `/notificationList?nextCursor=${pageParam}` : '/notificationList';
  
  const { data } = await axiosInstance.get(url);

  return {
    notifications: data.notification, // 알림 리스트
    nextPage: data.nextCursor, // 다음 페이지 커서
    isLast: !data.nextCursor, // 다음 페이지가 없으면 true
  };
};

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['NotificationList'],
    queryFn: fetchNotificationList,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    initialPageParam: null,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시된 데이터 유지
  });
};