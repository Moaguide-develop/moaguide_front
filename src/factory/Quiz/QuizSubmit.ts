import { axiosInstance } from '@/service/axiosInstance';

interface SubmitQuizPayload {
  answer: number[];
  insta: string;
  naver: string;
  time: string;
  type: string;
}

export const submitQuizAnswers = async (payload: SubmitQuizPayload) => {
  try {
    const response = await axiosInstance.post('/quiz/1', payload); 
    return response.data;
  } catch (error) {
    console.error('Failed to submit quiz answers:', error);
    throw new Error('Failed to submit quiz answers');
  }
};