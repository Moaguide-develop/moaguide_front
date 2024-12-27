import { axiosInstance } from '@/service/axiosInstance';
import { Payment, PaymentList } from '@/types/Payment';
import { useQuery } from '@tanstack/react-query';

export const fetchPaymentStatus = async () => {
  try {
    const { data } = await axiosInstance.get<Payment>('/billing/status');
    return data;
  } catch {
    console.error('Error fetching payment:');
    throw new Error('error paymentcheck.');
  }
};

export const usePaymentStatus = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['paymentcheck'],
    queryFn: fetchPaymentStatus,
    retry: 1
  });

  return { data, isLoading };
};

const fetchPaymentList = async () => {
  try {
    const { data } = await axiosInstance.get<PaymentList>('/billing/list');
    return data;
  } catch {
    console.error('Error fetching payment:');
    throw new Error('error paymentcheck.');
  }
};

export const usePaymentList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['paymentlist'],
    queryFn: fetchPaymentList
  });

  return { data, isLoading };
};
