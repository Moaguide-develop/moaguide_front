import { EducationRoadmaps } from '@/types/educationType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchEducationRoadmap = async (category: string) => {
  try {
    const { data } = await axios.get(
      `https://api.moaguide.com/study/${category}?page=1&size=3`
    );
    return data.roadmaps;
  } catch (e) {
    throw new Error('Failed to fetch main product data');
  }
};

export const getEducationRoadmap = (category: string) => {
  const queryKey = ['EducationRoadmap', category];

  const { data, error, ...queryProps } = useQuery<EducationRoadmaps[]>({
    queryKey,
    queryFn: () => fetchEducationRoadmap(category)
  });

  if (error) {
    console.error('Error fetching realtime rank:', error);
  }

  return {
    data,
    error,
    ...queryProps
  };
};
