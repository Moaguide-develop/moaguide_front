import { axiosInstance } from '@/service/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deletePayment = async () => {
  try {
    const { data } = await axiosInstance.delete('/card/delete/card');
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('카드삭제에 실패했습니다.');
  }
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  const deletePaymentMutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });

      alert('카드가 삭제되었습니다.');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error deleting payment:', error);
      alert('카드삭제에 실패했습니다.');
    }
  });

  return { deletePaymentMutation };
};
