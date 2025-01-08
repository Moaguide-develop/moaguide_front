import { axiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const firstpaymentcheck = async () => {
  try {
    const { data } = await axiosInstance.get('/billing/check/first');
    return data;
  } catch (error) {
    console.error('Error fetching payment:');
    throw new Error('error paymentcheck.');
  }
};

export const useFirstPaymentCheck = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['firstpaymentcheck'],
    queryFn: firstpaymentcheck,
    retry: 1
  });

  return { data, isLoading };
};
