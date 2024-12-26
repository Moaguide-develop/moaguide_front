import { axiosInstance } from '@/service/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const cancelSubscription = async () => {
  try {
    const { data } = await axiosInstance.delete('/billing/stop');
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('구독 취소에 실패했습니다.');
  }
};

export const useCancelSubscription = () => {
  const cancelSubscriptionMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      alert('구독이 취소되었습니다.');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error canceling subscription:', error);
      alert('구독 취소에 실패했습니다.');
    }
  });

  return { cancelSubscriptionMutation };
};
