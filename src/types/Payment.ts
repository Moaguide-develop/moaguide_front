export interface PaymentDate {
  startDate: string;
  endDate: string;
  paymentDate: string;
}

export interface Payment {
  date: PaymentDate;
  status: boolean;
}

export interface PaymentLog {
  id: number;
  nickname: string;
  orderId: string | null;
  paymentKey: string | null;
  orderName: string;
  totalAmount: number;
  method: string;
  requestedAt: string;
  approvedAt: string;
  discount: number;
}

export interface PaymentList {
  log: PaymentLog[];
}
