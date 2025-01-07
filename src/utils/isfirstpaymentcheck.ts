import { useFirstPaymentCheck } from '@/factory/Payment/firstpaymentcheck';

export const isfirstpaymentcheck = () => {
  const { data } = useFirstPaymentCheck();

  return data?.status;
};
