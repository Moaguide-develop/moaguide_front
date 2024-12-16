import React from 'react';
import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';

const LatestNewsClipping = ({ contents }: { contents: any[] }) => {
  return (
    <section className="relative mt-8">
      <h2 className="text-lg font-bold mb-6">뉴스 클리핑</h2>
      <div className="flex gap-6">
        {contents[0] && (
          <div className="flex-1 shadow-sm overflow-hidden rounded-lg border">
            <div className="bg-gray-200 rounded-t-lg overflow-hidden">
              <Image
                src={contents[0].img_link || defaultImage}
                alt={contents[0].title}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white p-6 h-full flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">{contents[0].title}</h3>
              <p className="text-gray-600 text-sm">{contents[0].description}</p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 w-1/2">
          {contents.slice(1, 5).map((content, index) => (
            <div
              key={index}
              className="flex items-stretch gap-4"
            >
              <div className="w-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={content.img_link || defaultImage}
                  alt={content.title}
                  width={160}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <span
                  className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-200"
                  style={{ display: 'inline-flex', maxWidth: 'fit-content' }}
                >
                  {content.type || '카테고리'}
                </span>
                <h3 className="text-md font-bold line-clamp-2">
                  {content.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {content.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsClipping;