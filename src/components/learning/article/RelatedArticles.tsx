import { useEffect, useState } from "react";
import { RelatedArticle } from "@/types/learning";
import Image from "next/image";
import { getRelatedArticles } from "@/factory/Article/GetArticle";
import { getValidImageSrc } from "@/utils/checkImageProperty";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import likeIcon from '../../../../public/images/learning/article_filter_like.svg';
import viewIcon from '../../../../public/images/learning/article_filter_view.svg';

interface RelatedArticlesProps {
  articleId: number;
}

const RelatedArticles = ({ articleId }: RelatedArticlesProps) => {
  const router = useRouter();
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[] | string>("");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContentClick = (item: any) => {
    router.push(`/learning/detail/${item.article.articleId}`);
  };

  const sliderSettings = {
    slidesPerView: 1, 
    spaceBetween: 0, 
    pagination: { clickable: true },
    modules: [Pagination],
    className: "w-full mySwiper",
  };

  if (typeof relatedArticles === "string") {
    return (
      <div className="max-w-[1000px] w-[90%] mx-auto mt-16 my-8 text-center">
        <h2 className="text-left text-black text-[2rem] font-bold leading-[44.80px] mb-8">
          관련 콘텐츠
        </h2>
        <p className="text-[#8a8a8a] text-lg font-semibold">{relatedArticles}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] w-[90%] mx-auto mt-16 my-8">
      <h2 className="text-black text-[2rem] font-bold leading-[44.80px] mb-8">
        관련 콘텐츠
      </h2>
      {!isMobile ? (
        <div className="hidden sm:grid grid-cols-3 gap-4">
          {relatedArticles.map((item) => (
            <div
              key={item.article.articleId}
              className="flex flex-col justify-between h-full cursor-pointer"
              onClick={() => handleContentClick(item)}
            >
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
                <h3 className="text-xl font-bold text-black mb-4">
                  {item.article.title}
                </h3>
                <div className="mt-auto flex justify-between items-center text-[#8a8a8a] text-base font-semibold">
                  <span>{new Date(item.article.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-row">
                      <Image src={likeIcon} alt="like" width={16} height={16} />
                      <span className="ml-1">{item.article.likes}</span>
                    </div>
                    <div className="flex flex-row">
                      <Image src={viewIcon} alt="view" width={16} height={16} />
                      <span className="ml-1">{item.article.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sm:hidden mx-auto w-[100%]">
          <Swiper {...sliderSettings}>
            {relatedArticles.map((item) => (
              <SwiperSlide key={item.article.articleId} className="relative">
                <div
                  className="flex flex-col justify-between h-full cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
                  onClick={() => handleContentClick(item)}
                >
                  <div className="w-full relative overflow-hidden rounded-[25px]" style={{ aspectRatio: "409 / 255" }}>
                    <Image
                      src={getValidImageSrc(item.article.imgLink)}
                      alt={item.article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 mt-4 px-4">
                    <h3 className="text-xl font-bold text-black mb-4">{item.article.title}</h3>
                    <div className="mt-auto flex justify-between items-center text-[#8a8a8a] text-base font-semibold">
                      <span>{new Date(item.article.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row">
                          <Image src={likeIcon} alt="like" width={16} height={16} />
                          <span className="ml-1">{item.article.likes}</span>
                        </div>
                        <div className="flex flex-row">
                          <Image src={viewIcon} alt="view" width={16} height={16} />
                          <span className="ml-1">{item.article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;