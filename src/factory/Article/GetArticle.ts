import { axiosInstance } from "@/service/axiosInstance";
import { ArticleDetail } from "@/types/learning";

export const getArticleDetail = async (articleId: number): Promise<ArticleDetail | null> => {
    console.log(articleId);
  try {
    const response = await axiosInstance.get<ArticleDetail>(
        `articles/detail/${articleId}`
      );
    return response.data;
  } catch (error) {
    if (!axiosInstance.defaults.headers.common['Authorization']) {
      return null;
    }
    throw error;
  }
};