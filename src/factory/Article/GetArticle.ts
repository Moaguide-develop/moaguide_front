import { axiosInstance } from "@/service/axiosInstance";
import { FilteredResponse } from "@/types/filterArticle";
import { ArticleDetail, RelatedArticle } from "@/types/learning";

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

export const getRelatedArticles = async (articleId: number): Promise<RelatedArticle[]> => {
  try {
    const response = await axiosInstance.get<RelatedArticle[]>(
      `articles/detail/${articleId}/related`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch related articles:', error);
    throw error;
  }
};

export const fetchContentsWithPage = async ({ queryKey }: { queryKey: [string, string, string, number] }) => {
  const [, type, category, page] = queryKey;

  try {
    const response = await axiosInstance.get<FilteredResponse>(
      `/contents/list`,
      {
        params: {
          type: type || 'all',
          category: category || 'all',
          page: page || 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw new Error('API 호출 실패');
  }
};
