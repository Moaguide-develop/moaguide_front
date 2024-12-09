import { axiosInstance } from '@/service/axiosInstance';

export const deletePayment = async () => {
  try {
    const { data } = await axiosInstance.delete('/card/delete/card');
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('카드삭제에 실패했습니다.');
  }
};
