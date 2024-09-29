'use client';
import { getEducationRoadmap, getEducationSubRoadmap } from '@/factory/EducationDetail';
import React, { useState } from 'react';
import RoadMapItem from './RoadMapItem';

const EducationIndex = () => {
  const [category, setCategory] = useState('guide');
  const [roadmap, setRoadmap] = useState('');

  const { data } = getEducationRoadmap(category);
  const { data: subRoadmapData } = getEducationSubRoadmap(roadmap);

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      {/* 캐러셀 이미지 */}
      <div className="mt-[26px] flex justify-center">
        <img src="/images/education/edu_main.svg" alt="" />
      </div>
      {/* 카테고리 */}
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
      {/* 로드맵 아이템 */}
      <ul className="mt-6 flex flex-col gap-10">
        {data?.map((item, i) => (
          <RoadMapItem
            subRoadmapData={subRoadmapData}
            key={i}
            roadmap={roadmap}
            setRoadmap={setRoadmap}
            {...item}
          />
        ))}
      </ul>

      <div className="h-20" />
    </div>
  );
};

export default EducationIndex;
