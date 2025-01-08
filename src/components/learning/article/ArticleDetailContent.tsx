import { getValidImageSrc } from "@/utils/checkImageProperty";
import Image from "next/image";

interface ContentProps {
  text: string;
  title: string;
  createdAt: string;
  authorName: string;
  imgLink: string | null;
}

const ArticleDetailContent = ({ text, title, createdAt, authorName, imgLink }: ContentProps) => {
  // 텍스트를 줄 바꿈에 따라 분리
  const formattedText = text.split("\n\n");

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
      <article className="mt-8 text-black text-[22px] font-semibold font-['Pretendard'] leading-[30.80px] tracking-wide">
        {formattedText.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  );
};

export default ArticleDetailContent;