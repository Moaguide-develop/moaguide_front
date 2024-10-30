import { axiosInstance } from '@/service/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const fetchData = async ({ productId }: { productId: string }) => {
  const response = await axiosInstance.post(`/product/view/${productId}`);
  return response.data;
};

export const CountupProductView = () => {
  const view = useMutation({
    mutationFn: fetchData,
    onError: () => {}
  });
  return view;
};

const fetchNewsData = async ({ productId }: { productId: string }) => {
  const response = await axiosInstance.post(`/news/view/${productId}`);
  return response.data;
};

export const CountupNewsView = () => {
  const view = useMutation({
    mutationFn: fetchNewsData,
    onError: () => {}
  });
  return view;
};
