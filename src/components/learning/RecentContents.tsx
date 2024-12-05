import React from 'react';
import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';

const RecentContents = ({ contents }: { contents: any[] }) => {
    return (
      <section className="mt-8 max-w-[360px] mx-auto desk:max-w-[1000px] w-[90%] lg:w-[100%]">
        <h2 className="text-lg font-bold mb-4">최신 콘텐츠</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {contents.map((content, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <Image
                src={content.img_link || defaultImage}
                alt={content.title}
                width={300}
                height={200}
                className="rounded-md mb-2"
              />
              <h3 className="text-sm font-semibold">{content.title}</h3>
              <p className="text-gray-600 text-sm">{content.description}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                {content.type === '아티클' ? '보러가기' : '재생하기'}
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default RecentContents;