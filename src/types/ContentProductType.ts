export interface IContentProductDetail {
  productId: string;
  name: string;
  genre: string;
  category: string;
  platform: string;
  totalPrice: number;
  rate: number;
  date: string;
  lowPrice: number;
  invest: boolean;
}

export interface IContentProductProfitDetail {
  publish: {
    name: string;
    genre: string;
    type: string;
    minAmount: number;
    maxAmount: number;
    piece: number;
    basePrice: number;
    minInvestment: number;
    issuanceDate: string;
    expirationDate: string;
  };
  investment: {
    totalBudget: number;
    unitPrice: number | null;
    profitRatio: number | null;
    breakEvenPoint: string;
  };
}
