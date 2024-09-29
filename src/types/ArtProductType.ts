export interface IArtProductDetail {
  category: string;
  platform: string;
  name: string;
  authorName: string;
  recruitmentPrice: number;
  recruitmentRate: number;
  totalPrice: number;
  recruitmentDate: string;
  minInvestment: number;
  link: string;
}

export interface IArtProductProfitDetail {
  artPublish: {
    name: string;
    type: string;
    authorName: string;
    piece: number;
    basePrice: number;
    totalPrice: string;
    issuanceDate: string;
  };
  artAuthor: {
    name: string;
    nationality: string;
    birth: string;
    academicAbility: string;
    awardCareer: string;
    major: string;
    introduction: string;
  };
  artWork: {
    name: string;
    size: string;
    material: string;
    productionDate: string;
    detail: string;
  };
}
