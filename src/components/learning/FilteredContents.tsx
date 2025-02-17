import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FilteredResponse } from '@/types/filterArticle';
import { getValidImageSrc } from '@/utils/checkImageProperty';
import premiumIcon from '../../../public/images/learning/premium_article.svg';
import likeIcon from '../../../public/images/learning/article_filter_like.svg';
import viewIcon from '../../../public/images/learning/article_filter_view.svg';
import { extractText } from '@/utils/extractText';
import { useLikeStore } from '@/store/articleLike.store';
import { useViewStore } from '@/store/articleView.store';

interface FilteredContentsProps {
  contents: FilteredResponse['content'];
  total: number;
  page: number;
  size: number;
  onPageChange: (newPage: number) => void;
}

const FilteredContents = ({
  contents,
  total,
  page,
  size,
  onPageChange,
}: FilteredContentsProps) => {
  const router = useRouter();
  const { likedArticles, setLikedArticle, getLikedState } = useLikeStore();
  const { articleViews, setArticleView, getArticleView } = useViewStore();
  const totalPages = Math.ceil(total / size);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleContentClick = (item: any) => {
    router.push(`/learning/detail/${item.article.articleId}`);
  };

  useEffect(() => {
    contents.forEach((item) => {
      // likes 저장
      const existingLike = getLikedState(item.article.articleId);
      if (!existingLike) {
        setLikedArticle(item.article.articleId, item.likedByMe, item.article.likes);
      }

      // views 저장
      const existingView = getArticleView(item.article.articleId);
      if (!existingView) {
        setArticleView(item.article.articleId, item.article.views);
      }
    });
  }, [contents, setLikedArticle, getLikedState, setArticleView, getArticleView]);

  return (
    <div className="w-[90%] lg:w-full mx-auto my-10">
      <div className="space-y-10">
        {contents.length > 0 ? (
          contents.map((item) => {
            const likeState = getLikedState(item.article.articleId) || {
              liked: item.likedByMe,
              likes: item.article.likes,
            };
            const viewCount = getArticleView(item.article.articleId) || item.article.views;

            return (
              <div
                key={item.article.articleId}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleContentClick(item)}
              >
                <div className="relative w-28 h-28 sm:w-64 sm:h-40 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={getValidImageSrc(item.article.img_link)}
                    alt={item.article.title}
                    width={128}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                  {item.article.isPremium && (
                    <div className="absolute bottom-2 left-2">
                      <Image
                        src={premiumIcon}
                        alt="프리미엄 아이콘"
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                </div>
                <div className="h-28 sm:h-40 w-full flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">
                    {item.article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {extractText(item.article.description || '')}
                  </p>
                  <div className="text-xs text-gray-500 mt-4 flex items-center justify-end gap-4">
                    <span>{formatDate(item.article.date)}</span>
                    <div className='flex flex-row'>
                    <Image
                        src={likeIcon}
                        alt="like"
                        width={16}
                        height={16}
                      />
                    <span className='ml-1'>{likeState.likes}</span>
                    </div>
                    <div className='flex flex-row'>
                    <Image
                        src={viewIcon}
                        alt="view"
                        width={16}
                        height={16}
                      />
                    <span className='ml-1'>{viewCount}</span> 
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">콘텐츠 준비중입니다.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-2">
          <ul className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <li key={pageNum}>
                  <button
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center border rounded ${
                      page === pageNum
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilteredContents;