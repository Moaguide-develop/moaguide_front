import { axiosInstance } from '@/service/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchAddBookMark = async ({
  productId,
  bookmark
}: {
  productId: string | undefined;
  bookmark: boolean | undefined;
}) => {
  const { data } = await axiosInstance.post(
    `https://api.moaguide.com/summary/bookmark/${productId}`,
    {
      productId,
      bookmark
    }
  );
  return data;
};

export const useAddBookMark = () => {
  const queryClient = useQueryClient();

  const addmutation = useMutation({
    mutationFn: fetchAddBookMark,

    onError: () => {}
  });

  return addmutation;
};

const fetchDeleteBookMark = async ({ productId }: { productId: string | undefined }) => {
  const { data } = await axiosInstance.delete(
    `https://api.moaguide.com/summary/bookmark/${productId}`
  );
  return data;
};

export const useDeleteBookMark = () => {
  const deletemutation = useMutation({
    mutationFn: fetchDeleteBookMark,
    onError: () => {}
  });

  return deletemutation;
};
