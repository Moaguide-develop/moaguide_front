export interface INoticeItem {
  content: null;
  id: number;
  noticeDay: string;
  title: string;
}

export interface INewsItem {
  id: number;
  title: string;
  category: string;
  link: string;
  date: string;
}

export interface IreportItem {
  id: number;
  title: string;
  content: string;
  category: string;

  date: string;
}

export interface IProductDetail {
  productId: string;
  name: string;
  category: string;
  platform: string;
  price: string;
  priceRate: number;
  totalPrice: string;
  lastDivide: number;
  lastDivideRate: number;
  divideCycle: number;
  link: string;
}
