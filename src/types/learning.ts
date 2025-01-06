export interface Article {
    articleId: number;
    title: string;
    type: string;
    description: string | null;
    imgLink: string | null;
    categoryName: string;
    premium: boolean;
  }
  
  export interface Content {
    likedByMe: boolean;
    article: Article;
  }
  
  export interface OverviewResponse {
    newsContents: Content[];
    recentContents: Content[];
    popularContents: Content[];
  }