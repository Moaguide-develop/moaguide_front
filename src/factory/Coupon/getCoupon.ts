import { axiosInstance, basicAxiosInstance } from '@/service/axiosInstance';
import { ICouponsType } from '@/types/coupons';
import { useQuery } from '@tanstack/react-query';

const fetchCoupon = async () => {
  try {
    const { data } = await axiosInstance<ICouponsType>(`/coupon/list`);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('쿠폰 조회에 실패했습니다.');
  }
};

export const getCoupon = () => {
  const { data } = useQuery({
    queryKey: ['couponList'],
    queryFn: fetchCoupon
  });

  return { data };
};
