import { axiosInstance } from '@/service/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { throttle } from 'lodash';
const fetchAddBookMark = async ({
  productId,
  bookmark
}: {
  productId: string | undefined;
  bookmark: boolean | undefined;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `https://api.moaguide.com/summary/bookmark/${productId}`,
      {
        productId,
        bookmark
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};

export const useAddBookMark = () => {
  const throttledFetchAddBookMark = throttle(fetchAddBookMark, 2000);
  const addmutation = useMutation({
    mutationFn: throttledFetchAddBookMark,

    onError: () => {}
  });

  return addmutation;
};

const fetchDeleteBookMark = async ({ productId }: { productId: string | undefined }) => {
  try {
    const { data } = await axiosInstance.delete(
      `https://api.moaguide.com/summary/bookmark/${productId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};

export const useDeleteBookMark = () => {
  const throttledFetchDeleteBookMark = throttle(fetchDeleteBookMark, 2000);

  const deletemutation = useMutation({
    mutationFn: throttledFetchDeleteBookMark,
    onError: () => {}
  });

  return deletemutation;
};
