import { axiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface ICardData {
  cardName?: string;
  cardNumber?: number;
}
export const fetchCheckCard = async () => {
  try {
    const { data } = await axiosInstance.get<ICardData>('/card/mycard');
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('카드체크에 실패했습니다.');
  }
};

export const useCheckCardRegister = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['cardchecking'],
    queryFn: fetchCheckCard,
    retry: false
  });

  return { data, isLoading };
};
