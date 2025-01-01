import { axiosInstance } from '@/service/axiosInstance';
import { IBuildingProductDetail } from '@/types/Product/BuildingProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchBuildingProductDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/building/${product_id}`);
  return data;
};

export const getBuildingProductDetail = (product_id: string) => {
  const queryKey = ['BuildingProductDetail', product_id];

  const { data, ...queryProps } = useQuery<IBuildingProductDetail>({
    queryKey,
    queryFn: fetchBuildingProductDetail
  });

  return {
    data,
    ...queryProps
  };
};
