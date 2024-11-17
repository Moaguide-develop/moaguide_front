import { axiosInstance } from '@/service/axiosInstance';
import { IHomeQuiz } from '@/types/Quiz';
import { useQuery } from '@tanstack/react-query';

const fetchHomeQuizRanking = async () => {
  try {
    const response = await axiosInstance.get<IHomeQuiz>('quiz/rank');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch quiz ranking');
  }
};

export const useHomeQuizRanking = () => {
  const queryKey = ['HomequizRanking'];
  const { data, error } = useQuery({
    queryKey,
    queryFn: fetchHomeQuizRanking
  });
  const Ranking = data?.Ranking || [];
  if (error) {
    console.error('Error fetching quiz ranking:', error);
  }

  return { Ranking, error };
};
