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
    paywallUp: string;
    imgLink: string | null;
    views: number;
    likes: number;
    createdAt: string;
  }

  export interface ArticleDetailResponse {
    likedByMe: boolean;
    articleDetail: ArticleDetail;
  }

  // 아티클 관련 정보
  export interface RelatedArticle {
    likedByMe: boolean;
    article: RelatedArticleContent;
  }

  export interface RelatedArticleContent {
    articleId: number;
    title: string;
    imgLink: string | null;
    createdAt: string;
    views: number;
    likes: number;
  }
