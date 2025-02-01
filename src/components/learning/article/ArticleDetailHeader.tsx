import Image from 'next/image';
import defaultImage from '../../../../public/images/learning/learning_img.svg';
import { getValidImageSrc } from '@/utils/checkImageProperty';

interface HeaderProps {
  categoryName: string;
  title: string;
  createdAt: string;
  authorName: string;
  imgLink: string | null;
}

const ArticleDetailHeader = ({ categoryName, title, createdAt, authorName, imgLink }: HeaderProps) => {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={getValidImageSrc(imgLink)}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
      {/* todo: 모바일 작업 */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
        <p className="text-center text-[#fffffc]/80 text-2xl font-medium font-['Pretendard'] leading-[33.60px] ">{categoryName.replace(/[^a-zA-Z0-9가-힣\s]/g, '')}</p>
        <hr className="w-16 border-t-2 border-white my-4" />
        <h1 className="w-[90%] mx-auto text-center text-white text-[32px] font-bold font-['Pretendard'] leading-[56px]">{title}</h1>
      </div>
    </div>
  );
};

export default ArticleDetailHeader;