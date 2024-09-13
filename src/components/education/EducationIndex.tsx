'use client';
import React, { useState } from 'react';

const EducationIndex = () => {
  const [category, setCategory] = useState('guide');

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <div className="mt-[26px] flex justify-center">
        <img src="/images/education/edu_main.svg" alt="" />
      </div>
      <div className="mt-8 flex items-center gap-5 border-b border-gray100 text-title2">
        <div
          onClick={() => {
            setCategory('guide');
          }}
          className={`pb-5 cursor-pointer ${category === 'guide' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          투자 가이드
        </div>
        <div
          onClick={() => {
            setCategory('article');
          }}
          className={`pb-5 cursor-pointer ${category === 'article' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          아티클
        </div>
      </div>
    </div>
  );
};

export default EducationIndex;
