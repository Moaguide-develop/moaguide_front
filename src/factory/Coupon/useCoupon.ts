import { axiosInstance } from '@/service/axiosInstance';
import { useToastStore } from '@/store/toast.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCoupon = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const addCoupon = useMutation({
    mutationFn: async (couponCode: string) => {
      try {
        const { data } = await axiosInstance.post(`/coupon/register?code=${couponCode}`);
        return { data }.data;
      } catch (error) {
        console.error(error);
        throw new Error('쿠폰 등록에 실패했습니다.');
      }
    },
    onSuccess: (data) => {
      console.log('쿠폰 등록 성공:', data);

      queryClient.invalidateQueries({
        queryKey: ['couponList'],
        exact: true
      });
      showToast('쿠폰이 성공적으로 등록되었습니다.');
    },
    onError: (error) => {
      console.error('쿠폰 등록 실패:', error);
      showToast('쿠폰등록이 실패되었습니다.');
    }
  });

  return { addCoupon };
};
