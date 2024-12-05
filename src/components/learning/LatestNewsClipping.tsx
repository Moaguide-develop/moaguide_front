import React from 'react';
import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';

const LatestNewsClipping = ({ contents }: { contents: any[] }) => {
    return (
      <section className="mt-8 max-w-[360px] mx-auto desk:max-w-[1000px] w-[90%] lg:w-[100%]">
        <h2 className="text-lg font-bold mb-4">뉴스 클리핑</h2>
        <div className="flex gap-4">
          {contents[0] && (
            <div className="flex-1 border rounded-lg shadow-sm">
              <Image
                src={contents[0].img_link || defaultImage}
                alt={contents[0].title}
                width={600}
                height={400}
                className="rounded-md mb-2"
              />
              <h3 className="text-sm font-semibold">{contents[0].title}</h3>
              <p className="text-gray-600 text-sm">{contents[0].description}</p>
            </div>
          )}
          <div className="flex flex-col gap-2 flex-1">
            {contents.slice(1, 5).map((content, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-2 flex items-center">
                <Image
                  src={content.img_link || defaultImage}
                  alt={content.title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-semibold">{content.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default LatestNewsClipping;