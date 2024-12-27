export interface PaymentDate {
  startDate: string;
  endDate: string;
  paymentDate: string;
}

export interface Payment {
  lastLogName: string;
  date: PaymentDate;
  status: string;
  lastAmount: number;
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
