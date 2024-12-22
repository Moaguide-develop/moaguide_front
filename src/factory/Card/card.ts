import { axiosInstance } from '@/service/axiosInstance';

interface ICardData {
  cardName?: string;
  cardNumber?: number;
}
export const fetchcardCheck = async () => {
  try {
    const { data } = await axiosInstance.get<ICardData>('/card/mycard');
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('결제에 실패했습니다.');
  }
};
