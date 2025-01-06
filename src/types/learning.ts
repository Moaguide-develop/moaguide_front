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

  export interface ArticleDetail {
    articleId: number;
    categoryName: string;
    title: string;
    authorName: string;
    text: string;
    imgLink: string | null;
    views: number;
    likes: number;
    createdAt: string;
  }