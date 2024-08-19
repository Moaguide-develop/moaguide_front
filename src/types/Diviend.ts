export interface Divide {
  product_Id: string;
  category: string;
  name: string;
  dividend: number;
  dividendRate: number;
}

export interface Summary {
  product_Id: string;
  category: string;
  platform: string;
  name: string;
  price: string;
  priceRate: number;
  totalPrice: string;
  dividend: number;
  lastDivide_rate: number;
}

export interface SummaryData {
  divide: Divide[];
  summary: Summary[];
}
