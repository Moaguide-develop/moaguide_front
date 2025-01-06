import { usePaymentStatus } from '@/factory/Payment/paymentcheck';

export const SubscribedStatus = () => {
  const { data } = usePaymentStatus();
  return { Subscribestatus: data?.status };
};
