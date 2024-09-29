export interface IMusicProductDetail {
  product_Id: string;
  category: string;
  platform: string;
  name: string;
  singer: string;
  price: number;
  priceRate: number;
  totalPrice: number;
  lastDivide: number;
  lastDivide_rate: number;
  divideCycle: number;
  link: string;
  bookmark: boolean;
}

export interface IMusicProductProfitDetail {
  musicPublish: {
    name: string;
    type: string;
    singer: string;
    piece: number;
    basePrice: number;
    totalPrice: number;
    issuDay: string;
  };
  musicSong: {
    introduceSong: string;
    genre: string;
    singer: string;
    writer: string;
    composing: string;
    announcementDate: string;
  };
  musicDivide: {
    lastDividend: number;
    lastDividendRate: number;
    divideDto: {
      broadcasting: number;
      transfer: number;
      replication: number;
      performance: number;
      deum: number;
      etc: number;
    };
    paymentDay: string;
    divideCycle: number;
  };
}

export interface IMusicYoutube {
  youtubeUrl: string;
  youtubeTitle: string;
}

export interface IYoutubeViewChartData {
  viewCount: string;
  viewDate: string;
}

export interface IYoutubeSearchData {
  value: string;
  date: string;
}

export type IContentYoutubeViewCharts = IYoutubeViewChartData[];
export type IContentYoutubeSearchCharts = IYoutubeSearchData[];

export interface IMusicScheduleData {
  title: string;
  place: string;
  period: string;
  imageUrl: string;
}

export type IMusicSchedule = IMusicScheduleData[];

export interface IMusicCopyRightFee {
  decisionDate: string;
  paymentDate: string;
  divide: number;
  divide_rate: number;
}

export interface IMusicCopyRightFeeChart {
  divide: IMusicCopyRightFee[];
}

export interface IMusicStockPrice {
  date: string;
  price: number;
}

export interface IMusicStockPriceChart {
  transaction: IMusicStockPrice[];
}
