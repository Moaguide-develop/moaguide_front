import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCoupon = () => {
  const addCoupon = useMutation({
    mutationFn: async (couponCode: string) => {
      const response = await axios.post('https://api.2021.cocoding.io/coupon', {
        couponCode
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('쿠폰 등록 성공:', data);
      // 성공 시 처리 로직 추가
    },
    onError: (error) => {
      console.error('쿠폰 등록 실패:', error);
      // 오류 시 처리 로직 추가
    }
  });

  return { addCoupon };
};
