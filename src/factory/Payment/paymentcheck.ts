import { axiosInstance } from '@/service/axiosInstance';
import { Payment } from '@/types/Payment';
import { useQuery } from '@tanstack/react-query';

export const fetchPaymentCheck = async () => {
  try {
    const { data } = await axiosInstance.get<Payment>('/billing/status');
    return data;
  } catch {
    console.error('Error fetching payment:');
    throw new Error('error paymentcheck.');
  }
};

export const usePaymentCheck = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['paymentcheck'],
    queryFn: fetchPaymentCheck
  });

  return { data, isLoading };
};



const fetchPaymentList = async () => {

  try{
    const { data } = await axiosInstance.get<Payment[]>('/billing/list');
    return data;
  }
  catch{
    console.error('Error fetching payment:');
    throw new Error('error paymentcheck.');
  }
}


const usePaymentList = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['paymentlist'],
    queryFn: fetchPaymentList
  });

  return { data, isLoading };

  
}