export interface FilteredArticle {
    articleId: number;
    title: string;
    type: string;
    isPremium: boolean;
    views: number;
    date: string;
    likes: number;
    description: string | null;
    img_link: string | null;
  }
  
  export interface FilteredContent {
    likedByMe: boolean;
    article: FilteredArticle;
  }
  
  export interface FilteredResponse {
    total: number;
    size: number;
    page: number;
    content: FilteredContent[];
  }