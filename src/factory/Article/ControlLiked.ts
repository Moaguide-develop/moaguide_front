import { axiosInstance } from '@/service/axiosInstance';

export interface LikeArticleResponse {
  likeCount: number;
  message: string;
  liked: boolean;
}

export const likeArticle = async (articleId: number): Promise<LikeArticleResponse> => {
  const { data } = await axiosInstance.post(`/articles/${articleId}/like`);
  return data;
};