'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleDetailHeader from '@/components/learning/article/ArticleDetailHeader';
import ArticleDetailContent from '@/components/learning/article/ArticleDetailContent';
import RelatedArticles from './RelatedArticles';
import BackButton from './BackButton';
import Image from 'next/image';
import sharedIcon from '../../../../public/images/learning/articleShare.svg';
import likedIcon from '../../../../public/images/learning/articleLiked.svg';
import noLikedIcon from '../../../../public/images/learning/articleNoLike.svg';
import { getArticleDetail } from '@/factory/Article/GetArticle';
import { likeArticle } from '@/factory/Article/ControlLiked';
import { ArticleDetailResponse } from '@/types/learning';

interface ArticleDetailClientWrapperProps {
  articleId: number;
}

const ArticleDetailClientWrapper = ({ articleId }: ArticleDetailClientWrapperProps) => {
  const router = useRouter();
  const [data, setData] = useState<ArticleDetailResponse | null>(null);
  const [likedByMe, setLikedByMe] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArticleDetail(articleId);
        if (result) {
          setData(result);
          setLikedByMe(result.likedByMe);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [articleId]);

  if (!data) {
    return null;
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/learning/detail/${articleId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('URL이 복사되었습니다!');
    } catch (error) {
      console.error('URL 복사 중 오류 발생:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const response = await likeArticle(articleId);
      setLikedByMe(response.liked);
    } catch (error) {
      console.error('좋아요 API 호출 실패:', error);
    }
  };

  const { articleDetail } = data;

  return (
    <div>
      <ArticleDetailHeader
        categoryName={articleDetail.categoryName}
        title={articleDetail.title}
        createdAt={articleDetail.createdAt}
        authorName={articleDetail.authorName}
        imgLink={articleDetail.imgLink}
      />
      <div className="max-w-[1000px] w-[90%] mx-auto py-8 flex items-center justify-between border-b border-[#ececec]">
        <div className="text-sm text-[#a0a0a0]">
          학습하기 &gt; 아티클 &gt; {articleDetail.categoryName}
        </div>
        {/* <div className="absolute inset-x-0 text-center">
          <h1 className="text-lg font-semibold text-[#777777]">{articleDetail.title}</h1>
        </div> */}
        <div className="flex items-center gap-4 z-[9999]">
          <Image
            src={likedByMe ? likedIcon : noLikedIcon}
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleLikeToggle}
          />
          <button onClick={handleShare} aria-label="공유하기">
            <Image
              src={sharedIcon}
              alt="공유 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <ArticleDetailContent
        text={articleDetail.text}
        title={articleDetail.title}
        paywallUp={articleDetail.paywallUp}
        createdAt={articleDetail.createdAt}
        authorName={articleDetail.authorName}
        imgLink={articleDetail.imgLink}
      />
      <RelatedArticles articleId={articleId} />
      <BackButton />
    </div>
  );
};

export default ArticleDetailClientWrapper;