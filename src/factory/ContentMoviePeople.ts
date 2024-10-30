import { IContentProductContentActor } from '@/types/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import { QueryFunctionContext } from '@tanstack/react-query';
import { basicAxiosInstance } from '@/service/axiosInstance';

const FetchContentMoviePeopleData = async ({ queryKey }: QueryFunctionContext) => {
  const [_, people] = queryKey;
  try {
    const response = await basicAxiosInstance.get(
      `/detail/content/people/${people}?page=1`
    );
    return response.data;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const GetContentMoviePeopleData = (people: string) => {
  const { data: ContentMoviePeopleData } = useQuery<IContentProductContentActor>({
    queryKey: ['ContentMoviePeople', people],
    queryFn: FetchContentMoviePeopleData
  });

  return { ContentMoviePeopleData };
};
