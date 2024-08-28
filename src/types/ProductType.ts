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

export interface IProductProfitDetail {
  product_Id: string;
  publish: {
    name: string;
    publisher: string | null;
    piece: number;
    last_divide: number;
    basePrice: number;
    totalPrice: string;
    subscription: string;
    listingDate: string | null;
  };
  buildingDetail: {
    productId: {
      productId: string;
      name: string;
      piece: number;
      views: number;
      nowPiece: number;
      category: string;
      platformId: {
        category: string;
        platform: string;
        possible: boolean;
        platformId: number;
        hibernateLazyInitializer: object;
      };
      platform: string;
    };
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
    location: string;
  };
  landRegistry: {
    id: number;
    productId: {
      productId: string;
      name: string;
      piece: number;
      views: number;
      nowPiece: number;
      category: string;
      platformId: {
        category: string;
        platform: string;
        possible: boolean;
        platformId: number;
        hibernateLazyInitializer: object;
      };
      platform: string;
    };
    landElevation: string;
    landShape: string;
    roadInterface: string;
    zoningNational: string;
    zoningOther: string;
  };
  lease: {
    tenant: string;
    tenantIntroduction: string;
    leasePeriod: string;
    leaseArea: number;
    deposit: number;
    rent: string;
    administrationCost: string;
    detailedConditions: string;
  }[];
}

export interface IProductType extends IProductDetail {
  notices: INoticeItem[];
  news: INewsItem[];
  reports: IreportItem[];
}
