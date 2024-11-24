import { axiosInstance } from '@/service/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const fetchData = async ({ productId }: { productId: string }) => {
  try {
    const response = await axiosInstance.post(`/product/view/${productId}`);
    return response.data;
  } catch (error) {
    console.error('오류가 발생했습니다:', error);
    throw error;
  }
};

export const CountupProductView = () => {
  const view = useMutation({
    mutationFn: fetchData,
    onError: (error) => {
      console.error('오류가 발생했습니다:', error);
    }
  });
  return view;
};

const fetchNewsData = async ({ productId }: { productId: string }) => {
  try {
    const response = await axiosInstance.post(`/news/view/${productId}`);
    return response.data;
  } catch (error) {
    console.error('뉴스 조회 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const CountupNewsView = () => {
  const view = useMutation({
    mutationFn: fetchNewsData,
    onError: (error) => {
      console.error('뉴스 조회 중 오류가 발생했습니다:', error);
    }
  });
  return view;
};
