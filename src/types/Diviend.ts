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
  description: string;
  category: string;
  imageLink: string;
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
  bookmark: boolean;
}

export interface IProductEndRecruit {
  productId: string;
  name: string;
  category: string;
  platform: string;
  totalPrice: number;
  sailRate: number;
  bookmark: boolean;
}

export interface IProductRecruit {
  productId: string;
  name: string;
  totalprice: number;
  day: string;
  category: string;
  platform: string;
  recruitmentRate: number;
  bookmark: boolean;
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

export interface IProductDealDetailData {
  product: IProductDetail[];
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

export interface IProductEndRecruitmentData {
  product: IProductEndRecruit[];
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

export interface IProductRecruitmentData {
  product: IProductRecruit[];
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

export type IProductCommon =
  | IProductDealDetailData
  | IProductEndRecruitmentData
  | IProductRecruitmentData;
