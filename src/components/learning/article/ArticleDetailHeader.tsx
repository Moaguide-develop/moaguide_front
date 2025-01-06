import Image from 'next/image';
import defaultImage from '../../../../public/images/learning/learning_img.svg';

interface HeaderProps {
  categoryName: string;
  title: string;
  createdAt: string;
  authorName: string;
  imgLink: string | null;
}

const getValidImageSrc = (imgLink: string | null) => {
  if (!imgLink || imgLink === '테스트') {
    return defaultImage;
  }
  if (imgLink.startsWith('http://') || imgLink.startsWith('https://')) {
    return imgLink;
  }
  return defaultImage;
};

const ArticleDetailHeader = ({ categoryName, title, createdAt, authorName, imgLink }: HeaderProps) => {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={getValidImageSrc(imgLink)}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
        <p className="text-sm">{categoryName}</p>
        <hr className="w-16 border-t-2 border-white my-2" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default ArticleDetailHeader;