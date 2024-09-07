import axios from 'axios';

import { redirect } from 'next/navigation';

interface PaymentRequestProps {
  paymentKey: string;
  orderId: string;
  amount: string;
}

interface PaymentResponseProps {
  mId?: string;
  orderName?: string;
  approvedAt?: string;
  requestedAt?: string;
  status: string;
  receipt?: {
    url?: string;
  };
  checkout?: {
    url?: string;
  };
  card?: {
    number?: string;
    cardType?: string;
  };
  type?: string;
  totalAmount: number;
  method?: '카드' | '가상계좌' | '계좌이체';
}

interface ParamsProps {
  searchParams: PaymentRequestProps;
}

interface Payment {
  payment?: PaymentResponseProps;
  redirect?: {
    destination?: string;
  };
}

export default async function PaymentSuccess({ searchParams }: ParamsProps) {
  const paymentKey = searchParams.paymentKey;
  const orderId = searchParams.orderId;
  const amount = searchParams.amount;

  const data: Payment = await getPayment({
    paymentKey,
    orderId,
    amount
  });

  if (data?.redirect) {
    redirect(data?.redirect?.destination || '/');
  }

  return <div>hi</div>;
}

async function getPayment({ paymentKey, orderId, amount }: PaymentRequestProps) {
  try {
    const { data: payment } = await axios.post<PaymentResponseProps>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TOSS_CLIENT_SECRET}:`
          ).toString('base64')}`
        }
      }
    );

    if (payment) {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
        orderId: orderId,
        paymentKey: paymentKey,
        amount: amount,
        bookingStatus: 'SUCCESS',
        status: payment.status,
        method: payment?.method,
        receiptUrl: payment?.receipt?.url,
        approvedAt: payment?.approvedAt,
        cardNumber: payment?.card?.number,
        cardType: payment?.card?.cardType,
        type: payment?.type,
        mId: payment?.mId,
        checkoutUrl: payment?.checkout?.url
      });
    }

    return {
      payment: payment
    };
  } catch (err: any) {
    console.log(err);

    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      orderId: orderId,
      paymentKey: paymentKey,
      amount: amount,
      bookingStatus: 'FAILED',
      failureCode: err.code,
      failureMessage: err.message
    });

    return {
      redirect: {
        destination: `/payments/fail?code=${err.code}&message=${err.message}&orderId=${orderId}`
      }
    };
  }
}
