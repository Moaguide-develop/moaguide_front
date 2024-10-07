export interface MainReportType {
  id?: number;
  title: string;
  category: string;
  date: string;
  imageLink: string;
  description: string;
  link: string;
}

export interface MainNews {
  id: number;
  title: string;
  category: string;
  link: string;
  date: string;
  imgUrl: string;
}

export interface MainReportNewsType {
  mainReport: MainReportType[];
  mainNews: MainNews[];
}

export interface RealtimeRankType {
  keyword: string;
  rank: number;
}

export interface IssueListItem {
  id: number;
  title: string;
  category: string;
  link: string;
  date: string;
}

export interface MainProductItem {
  product_Id: string;
  category: string;
  platform: string;
  name: string;
  price: number;
  priceRate: number;
  totalPrice: number;
  lastDivide_rate: number;
}

export interface ReportListsItem {
  id: number;
  title: string;
  content?: string;
  category: string;
  date: string;
}

export interface SearchedItem {
  productId?: string;
  name: string;
  platform: string;
  category: string;
  price?: number;
  priceRate?: number;
  totalPrice?: number;
  dividend?: number;
  lastDivide_rate?: number;
  product_Id: string;
}


export interface StudyGuidesItem {
  id: number;
  title: string;
  link: string;
}

export interface SubLoadmap {
  id: number;
  number: number;
  title: string;
  description: string;
}

export interface CategorySubloadmapItemProps {
  data: SubLoadmap;
  isTop: boolean;
  isBottom: boolean;
}

export interface CategorySubloadmapSkeletonItemProps {
  isTop: boolean;
  isBottom: boolean;
}

export interface InvestmentGuideProps {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  date: string;
  link: string;
}


export interface ArticleItem {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  date: string;
  content?: string;
  pdfLink: string;
}