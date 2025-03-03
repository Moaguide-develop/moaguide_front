'use client';

import { useRouter } from "next/navigation";

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
  
      doc.querySelectorAll("[class*='max-w-[']").forEach((el) => {
        const classList = el.getAttribute("class") || "";
        const match = classList.match(/max-w-\[(\d+)px\]/);

        if (match) {
          const maxWidth = match[1];
          (el as HTMLElement).style.maxWidth = `${maxWidth}px`;
          el.setAttribute("class", classList.replace(match[0], "").trim());
        }
      });
  
      doc.querySelectorAll("[class*='left-[']").forEach((el) => {
        const classList = el.getAttribute("class") || "";
        const match = classList.match(/left-\[(\d+)px\]/);

        if (match) {
          const leftValue = parseInt(match[1], 10) + 15; 
          (el as HTMLElement).style.left = `${leftValue}px`;
          el.setAttribute("class", classList.replace(match[0], "").trim());
        }
      });
  
      return doc.body.innerHTML;
    } catch (error) {
      console.error("HTML 파싱 중 오류 발생:", error);
      return htmlContent;
    }
  };
  

  const parsedPaywallContent = paywallUp ? parseHtmlContent(paywallUp) : null;
  const parsedTextContent = text ? parseHtmlContent(text) : null;

  return (
    <div className="max-w-[1000px] w-[90%] mx-auto my-10">
      <p className="text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString()} <br />
        BY. {authorName}
      </p>
      {isPremium ? (
        <>
          <article
            className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide"
            dangerouslySetInnerHTML={{
              __html: parsedPaywallContent || "<p>프리미엄 콘텐츠를 준비 중입니다.</p>",
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
              className="block w-full max-w-[400px] py-4 px-8 bg-[#611cf2] text-white font-bold rounded-full transition text-center cursor-pointer hover:bg-[#4b10bf]"
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
        <article
          className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide"
          dangerouslySetInnerHTML={{
            __html: parsedTextContent || "<p>텍스트 콘텐츠를 불러올 수 없습니다.</p>",
          }}
        />
      )}
    </div>
  );
};

export default ArticleDetailContent;