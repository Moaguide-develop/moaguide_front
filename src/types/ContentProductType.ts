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

export interface IContentMovieStats {
  schedules: {
    id: number;
    title: string;
    genre: string;
    country: string;
    director: string;
    releaseDate: string;
    imgLink: string;
  }[];
  stats: {
    day: string;
    region: string;
    screenCount: number;
    totalRevenue: number;
    revenueShare: number;
    totalAudience: number;
    audienceShare: number;
    releaseDate: string;
  }[];
}

export interface IContentMovieChartData {
  count: number;
  day: string;
}

export type IContentMovieCharts = IContentMovieChartData[];

export interface IMovieSchedule {
  id: number;
  title: string;
  genre: string;
  country: string;
  director: string;
  releaseDate: string;
  imgLink: string;
}

export type IMovieSchedules = IMovieSchedule[];
