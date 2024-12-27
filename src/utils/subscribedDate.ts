import { usePaymentStatus } from '@/factory/Payment/paymentcheck';
export const SubscribedInfo = () => {
  const { data } = usePaymentStatus();

  return {
    SubScribedDate: data?.lastLogName,
    SubScribedPrice: data?.lastAmount
  };
};
