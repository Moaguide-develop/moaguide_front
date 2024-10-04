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
  link: string;
  bookmark: boolean;
}

export interface IContentProductProfitDetail {
  base: {
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
  };
  object: {
    // CULTURE
    venue?: string;
    period?: string;
    casting?: string;
    director?: string;
    showTimes?: string;
    producer?: string;

    // MOVIE
    movieInfo?: string;
    subgenre?: string;
    releaseDate?: string;
    grade?: string;
    runningTime?: number;
    // director?: string;
    actor?: string;
    distributor?: string;
    originalInfo?: string;

    // EXHIBITION
    place?: string;
    // period?: string;

    // ANIMATION
    airDate?: string;
    // director?: string ;
    cast?: string | null;
    company?: string;
    channel?: string;

    // DRAMA 전체 중복
    // airDate?: string;
    // director?: string;
    // cast?: string;
    // company?: string;
    // channel?: string;
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
