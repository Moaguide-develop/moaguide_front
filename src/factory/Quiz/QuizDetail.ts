import { axiosInstance, basicAxiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { QuizResponse } from '@/types/Quiz';

const fetchQuizDetail = async () => {
  try {
    const response = await basicAxiosInstance.get<QuizResponse>('quiz');
    console.log('API 응답 데이터:', response.data); // API 응답을 출력
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('Failed to fetch quiz detail');
  }
};

export const useQuizDetail = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['quizDetail'],
    queryFn: fetchQuizDetail
  });
  if (error) {
    console.error('Error fetching quiz ranking:', error);
  }
  return {
    data,
    error,
    isLoading
  };
};
