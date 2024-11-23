import { axiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchNotificationList = async ({ pageParam = null }) => {
  try {
    const url = pageParam
      ? `/notificationList?nextCursor=${pageParam}`
      : '/notificationList';
    const { data } = await axiosInstance.get(url);

    return {
      notifications: data.notification,
      nextPage: data.nextCursor,
      isLast: !data.nextCursor
    };
  } catch (error) {
    console.error('알림 리스트를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['NotificationList'],
    queryFn: fetchNotificationList,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    initialPageParam: null,
    staleTime: 5 * 60 * 1000
  });
};
