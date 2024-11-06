import { basicAxiosInstance, axiosInstance } from '@/service/axiosInstance';
import { IQuiz, IQuizScore } from '@/types/Quiz';
import { useQuery } from '@tanstack/react-query';

const fetchQuizRanking = async () => {
  try {
    const response = await basicAxiosInstance.get<IQuiz>('quiz/rank/list');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch quiz ranking');
  }
};

export const useQuizRanking = () => {
  const queryKey = ['quizRanking'];
  const { data, error } = useQuery({
    queryKey,
    queryFn: fetchQuizRanking
  });
  const Ranking = data?.Ranking || [];
  if (error) {
    console.error('Error fetching quiz ranking:', error);
  }

  return { Ranking, error };
};

const fetchQuizTopRanking = async () => {
  try {
    const response = await axiosInstance.get<IQuizScore>('quiz/rank/detail');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch quiz ranking');
  }
};

export const useQuizTopRanking = () => {
  const queryKey = ['TopQuizRanking'];
  const { data, error } = useQuery({
    queryKey,
    queryFn: fetchQuizTopRanking
  });
  if (error) {
    console.error('Error fetching quiz ranking:', error);
  }

  return { data, error };
};
