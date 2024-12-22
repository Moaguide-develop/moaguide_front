export interface PaymentDate {
  startDate: string;
  endDate: string;
  paymentDate: string | null;
}

export interface Payment {
  date: PaymentDate;
  status: boolean;
}