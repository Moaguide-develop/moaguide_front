import { axiosInstance } from '@/service/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { throttle } from 'lodash';
const fetchAddBookMark = async ({
  productId,
  bookmark
}: {
  productId: string | undefined;
  bookmark: boolean | undefined;
}) => {
  try {
    const { data } = await axiosInstance.post(`/summary/bookmark/${productId}`, {
      productId,
      bookmark
    });
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
    const { data } = await axiosInstance.delete(`/summary/bookmark/${productId}`);
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

const fetchBookmarks = async () => {
  const { data } = await axiosInstance.get('/user/bookmark');
  return data;
};

export const useBookmarks = () => {
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks
  });

  return { bookmarks, isLoading };
};
