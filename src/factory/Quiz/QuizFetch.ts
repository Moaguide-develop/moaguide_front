import { axiosInstance } from '@/service/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const fetchQuizQuestions = async () => {
  try {
    const response = await axiosInstance.get('quiz/1');
    return response.data.question;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      alert("이미 시험에 응시했습니다!");
      window.history.back(); 
    } else {
      console.error('Failed to fetch quiz questions:', error);
      throw new Error('Failed to fetch quiz questions');
    }
  }
};

export const useQuizQuestions = () => {
  return useQuery({
    queryKey: ['quizQuestions'],
    queryFn: fetchQuizQuestions,
    staleTime: 1000 * 60 * 10,
  });
};