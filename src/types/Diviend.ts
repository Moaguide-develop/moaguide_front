export interface IDivide {
  product_Id: string;
  category: string;
  name: string;
  dividend: number;
  dividendRate: number;
}

export interface ISummary {
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

export interface IReport {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

export interface IProductDetail {
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

interface IProductDetailSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IProductDetailPageable {
  pageNumber: number;
  pageSize: number;
  sort: IProductDetailSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IProductDetailData {
  content: IProductDetail[];
  pageable: IProductDetailPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: IProductDetailSort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IReportData {
  report: IReport[];
}

export interface ISummaryData {
  divide: IDivide[];
  summary: ISummary[];
}
