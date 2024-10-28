import { axiosInstance } from '@/service/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const fetchData = async ({ productId }: { productId: string }) => {
  const response = await axiosInstance.post(
    `https://api.moaguide.com/product/view/${productId}`
  );
  return response.data;
};

export const CountupProductView = () => {
  const view = useMutation({
    mutationFn: fetchData,
    onError: () => {}
  });
  return view;
};
