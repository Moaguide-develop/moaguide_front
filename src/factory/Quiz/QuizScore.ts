import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/service/axiosInstance';

const fetchQuizScore = async () => {
  try {
    const response = await axiosInstance.get('/quiz/myscore');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch quiz score:', error);
    throw new Error('Failed to fetch quiz score');
  }
};

export const useQuizScore = () => {
  return useQuery({
    queryKey: ['quizScore'],
    queryFn: fetchQuizScore,
  });
};