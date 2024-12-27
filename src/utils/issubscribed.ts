import { usePaymentStatus } from '@/factory/Payment/paymentcheck';

export const IsSubscribed = () => {
  const { data } = usePaymentStatus();
  if (data?.status === 'subscribed' || data?.status === 'unsubscribing') {
    return true;
  } else {
    return false;
  }
};
