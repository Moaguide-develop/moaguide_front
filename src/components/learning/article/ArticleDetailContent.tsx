'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { getValidImageSrc } from "@/utils/checkImageProperty";

interface ContentProps {
  text?: string;
  title: string;
  paywallUp?: string;
  createdAt: string;
  authorName: string;
  imgLink: string | null;
}

const ArticleDetailContent = ({ text, title, paywallUp, createdAt, authorName, imgLink }: ContentProps) => {
  const isPremium = !!paywallUp;
  const router = useRouter();

  const handleAccesstion = () => {
    router.push('/payment');
  };

  const parseHtmlContent = (htmlContent: string): string => {
    if (!htmlContent) return "";

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      return doc.body.innerHTML; 
    } catch (error) {
      console.error("HTML 파싱 중 오류 발생:", error);
      return htmlContent; 
    }
  };

  const parsedContent = paywallUp ? parseHtmlContent(paywallUp) : null;

  return (
    <div className="max-w-[1000px] w-[90%] mx-auto my-10">
      <p className="text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString()} <br />
        BY. {authorName}
      </p>
      <Image
        src={getValidImageSrc(imgLink)}
        alt={title}
        className="w-full max-w-[650px] aspect-square my-16 object-cover mx-auto rounded-lg"
      />
      {isPremium ? (
        <>
          <article
            className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide"
            dangerouslySetInnerHTML={{
              __html: parsedContent || "<p>프리미엄 콘텐츠를 준비 중입니다.</p>",
            }}
          />
          <div className="my-24 rounded-lg text-center flex flex-col items-center gap-4">
            <p
              className="text-center text-black font-semibold font-['Pretendard'] leading-[1.2] tracking-wide"
              style={{
                fontSize: 'clamp(24px, 5vw, 40px)',
              }}
            >
              투자 칼럼을 읽으며<br />조각투자로 부의 길을 걸어보세요!
            </p>
            <p
              className="text-center text-black font-semibold font-['Pretendard'] leading-[1.4] tracking-wide"
              style={{
                fontSize: 'clamp(18px, 4vw, 32px)',
              }}
            >
              모아가이드를 구독하고 자료를 이어서 받아보세요
            </p>
            <div
              className="block w-[90%] max-w-[400px] py-6 px-8 bg-[#611cf2] text-white font-bold rounded-full transition text-center cursor-pointer hover:bg-[#4b10bf]"
              style={{
                fontSize: 'clamp(18px, 3vw, 24px)',
              }}
              onClick={handleAccesstion}
            >
              3초만에 가입하고 계속 보기
            </div>
          </div>
        </>
      ) : (
        <article className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide">
          {text?.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </article>
      )}
    </div>
  );
};

export default ArticleDetailContent;