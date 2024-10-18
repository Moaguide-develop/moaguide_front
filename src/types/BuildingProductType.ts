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
  imgUrl: string;
}

export interface IreportItem {
  id: number;
  title: string;
  content: string;
  category: string;

  date: string;
}

export interface IBuildingProductDetail {
  product_Id: string;
  name: string;
  category: string;
  platform: string;
  price: string;
  priceRate: number;
  totalPrice: string;
  lastDivide: number;
  lastDivide_rate: number;
  divideCycle: number;
  link: string;
  rentType: boolean;
  bookmark: boolean;
}

export interface IBuildingProductProfitDetail {
  product_Id: string;
  publish: {
    name: string;
    publisher: string;
    piece: number;
    last_divide: number;
    basePrice: number;
    totalPrice: number;
    subscription: string;
    listingDate: string;
  };
  buildingDetail: {
    productId: string | null;
    address: string;
    useArea: string;
    mainUse: string;
    completionDate: string;
    landArea: string;
    floorArea: string;
    floorAreaRate: number;
    dryRatio: number;
    height: number;
    scale: string;
    mainStructure: string;
    parking: number;
    lift: number;
  };
  landRegistry: {
    id: string | null;
    productId: string | null;
    landElevation: string;
    landShape: string;
    roadInterface: string;
    zoningNational: string;
    zoningOther: string;
  };
  lease: {
    tenant: string;
    tenantIntroduction: string | null;
    leasePeriod: string;
    leaseArea: number;
    deposit: number;
    rent: string;
    adminCost: string;
    detaile: string;
  }[];
  divide: {
    lastDivide: number;
    divideCycle: number;
    paymentDay: string;
    divideRate: number;
  };
}

export interface IProductType extends IBuildingProductDetail {
  notices: INoticeItem[];
  news: INewsItem[];
  reports: IreportItem[];
}

export interface ISubwayDayItem {
  day: string;
  boarding: number;
  alighting: number;
}

export interface ISubwayMonthItem {
  day: string;
  boarding: number;
  alighting: number;
}

export interface ISubwayData {
  subwayDay: ISubwayDayItem[];
  subwayMonth: ISubwayMonthItem[];
}
