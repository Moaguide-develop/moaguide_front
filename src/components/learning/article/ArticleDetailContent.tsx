import { getValidImageSrc } from "@/utils/checkImageProperty";
import Image from "next/image";
import Link from "next/link";
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
  const formattedPaywallUp = paywallUp ? paywallUp.split("\n") : [];
  const router = useRouter();

  const handleAccesstion = () => {
    // 결제 페이지 이동 작업
    router.push('/');
  }

  return (
    <div className="max-w-[1000px] w-[90%] lg:w-full mx-auto my-10">
      <p className="text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString()} <br />
        BY. {authorName}
      </p>
      <Image
        src={getValidImageSrc(imgLink)}
        alt={title}
        className="w-full h-full mt-16 my-8"
      />
      {isPremium ? (
        <>
          <article className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide relative">
            {formattedPaywallUp.slice(0, 4).map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
            <div className="relative">
              {formattedPaywallUp.slice(4, 7).map((line, index) => (
                <p key={index} className="mb-4 text-gray-400">
                  {line}
                </p>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none"></div>
            </div>
          </article>
          <div className="mt-8 rounded-lg text-center flex flex-col items-center gap-4">
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