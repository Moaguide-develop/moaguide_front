'use client';

import React from 'react';

const LatestNewsClippingSkeleton = () => {
  return (
    <section className="relative mt-12 mb-4">
      <h2 className="w-[90%] sm:w-[100%] mx-auto text-lg font-bold mb-6">
        뉴스 클리핑
      </h2>
      <div className="hidden sm:flex gap-6">
        <div className="flex-1 shadow-sm overflow-hidden rounded-lg border animate-pulse">
          <div className="bg-gray-300 rounded-t-lg h-[300px] w-full" />
          <div className="bg-white p-6 h-full flex flex-col">
            <div className="h-6 bg-gray-200 rounded-md mb-4 w-3/4" />
            <div className="h-4 bg-gray-200 rounded-md w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-[2rem] w-1/2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-stretch gap-4 animate-pulse"
            >
              <div className="w-32 h-20 bg-gray-300 rounded-lg" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/5" />
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-2/3" />
                <div className="h-8 bg-gray-200 rounded-md w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <div className="w-full overflow-hidden mb-4 animate-pulse">
          <div className="bg-gray-300 w-full h-48" />
          <div className="bg-white w-[90%] sm:w-[100%] mx-auto pt-4">
            <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2" />
            <div className="h-8 bg-gray-200 rounded-md w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 w-[90%] sm:w-[100%] mx-auto animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-lg" />
              <div className="flex-1 flex flex-col justify-between my-1">
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-2/3" />
                <div className="h-8 bg-gray-200 rounded-md w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-[90%] mx-auto mt-8">
          <div className="w-full flex justify-center items-center rounded-3xl border border-[#8a8a8a] py-4 bg-gray-200 text-transparent text-sm font-bold">
            더보기
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsClippingSkeleton;