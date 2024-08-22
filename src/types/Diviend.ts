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

export interface IReportData {
  report: IReport[];
}

export interface ISummaryData {
  divide: IDivide[];
  summary: ISummary[];
}
