import { useEffect, useState } from "react";
import { RelatedArticle } from "@/types/learning";
import Image from "next/image";
import { getRelatedArticles } from "@/factory/Article/GetArticle";
import { getValidImageSrc } from "@/utils/checkImageProperty";
import { useRouter } from "next/navigation";

interface RelatedArticlesProps {
  articleId: number;
}

const RelatedArticles = ({ articleId }: RelatedArticlesProps) => {
  const router = useRouter();
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[] | string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRelatedArticles(articleId);
        setRelatedArticles(data);
      } catch (error) {
        console.error("Failed to fetch related articles:", error);
        setRelatedArticles("관련 컨텐츠가 없습니다.");
      }
    };

    fetchData();
  }, [articleId]);

  const handleContentClick = (item: any) => {
    router.push(`/learning/detail/${item.article.articleId}`);
  };

  // 데이터가 없을 때 처리
  if (typeof relatedArticles === "string") {
    return (
      <div className="max-w-[1000px] w-[90%] mx-auto mt-16 my-8 text-center">
        <h2 className="text-left text-black text-[2rem] font-bold font-['Pretendard'] leading-[44.80px] tracking-wide mb-8">
          관련 콘텐츠
        </h2>
        <p className="text-[#8a8a8a] text-lg font-semibold">{relatedArticles}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] w-[90%] mx-auto mt-16 my-8">
      <h2 className="text-black text-[2rem] font-bold font-['Pretendard'] leading-[44.80px] tracking-wide mb-8">
        관련 콘텐츠
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {relatedArticles.map((item) => (
          <div key={item.article.articleId} className="flex flex-col justify-between h-full cursor-pointer"
            onClick={() => handleContentClick(item)}>
            <div
              className="w-full relative overflow-hidden rounded-[25px]"
              style={{ aspectRatio: "409 / 255" }}
            >
              <Image
                src={getValidImageSrc(item.article.imgLink)}
                alt={item.article.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col flex-1 mt-4">
              <h3 className="text-xl font-bold text-black mb-4">{item.article.title}</h3>
              <div className="mt-auto flex justify-between items-center text-[#8a8a8a] text-base font-semibold">
                <span>{new Date(item.article.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#8a8a8a] text-base font-semibold">❤️ {item.article.likes}</span>
                  <span className="text-[#8a8a8a] text-base font-semibold">👁️ {item.article.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;