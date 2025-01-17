export interface ICoupon {
  couponId: number;
  createdAt: string;
  couponName: string;
}

export interface ICouponsType {
  coupons: ICoupon[];
}
