import { IssueListItem } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const CategoryNewsItem = ({ id, title, category, link, date, imgUrl }: IssueListItem) => {
  const defaultImages: { [key: string]: string } = {
    building: 'images/home/default-real-estate.png',
    music: 'images/home/default-entertainment.png',
    cow: 'images/home/default-cow.png',
    art: 'images/home/default-art.png',
    content: 'images/home/default-contents.png'
  };

  const imageSrc =
    !imgUrl || imgUrl === 'No image' || imgUrl === 'null'
      ? defaultImages[category]
      : imgUrl;

  return (
    <Link href={link} target="_blank">
      <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 items-center cursor-pointer">
        <div>
        <img
          src={imageSrc}
          alt="img"
          width={132}
          height={93}
          className="w-[132px] h-[93px] rounded-[12px] object-cover"
          style={{ objectPosition: 'top' }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 132px"
          srcSet={`
            ${imageSrc}?w=300 300w,
            ${imageSrc}?w=600 600w,
            ${imageSrc}?w=900 900w,
            ${imageSrc}?w=1200 1200w
          `}
        />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-body5 sm:text-title2 text-gray600">{title}</div>
          <div className="flex items-center justify-between">
            <div className="text-caption3 sm:text-body7 text-gray400">
              {formatCategory(category)}
            </div>
            <div className="text-caption3 sm:text-body7 text-gray300">
              {format(parseISO(date), 'yyyy.MM.dd')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryNewsItem;
