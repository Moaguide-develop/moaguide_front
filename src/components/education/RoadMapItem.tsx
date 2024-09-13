import { EducationRoadmaps } from '@/types/educationType';
import React, { Dispatch } from 'react';
import SubRoadMapItem from './SubRoadMapItem';

interface RoadMapItemType {
  id: number;
  description: string;
  difficulty: string;
  title: string;
  subRoadmapData: EducationRoadmaps[] | undefined;
  roadmap: string;
  setRoadmap: Dispatch<React.SetStateAction<string>>;
}

const RoadMapItem = ({
  id,
  description,
  difficulty,
  title,
  subRoadmapData,
  roadmap,
  setRoadmap
}: RoadMapItemType) => {
  console.log(subRoadmapData);

  return (
    <div>
      <li
        onClick={() => setRoadmap(String(id))}
        className="flex items-center justify-between cursor-pointer">
        <div className="flex flex-col gap-3">
          <div className="max-w-max p-[6px] rounded-[4px] flex items-center justify-center bg-bg text-gray400 text-caption2 ">
            {difficulty}
          </div>
          <div className="text-title2 text-gray600">{title}</div>
          <div className="text-body7 text-gray300">{description}</div>
        </div>
        <div>
          {roadmap === String(id) ? (
            <img src="/images/education/toUp.svg" alt="" />
          ) : (
            <img src="/images/education/toBottom.svg" alt="" />
          )}
        </div>
      </li>
      {subRoadmapData && roadmap === String(id) ? (
        <div className="mt-5 border-t border-black">
          {subRoadmapData.map((item, i) => (
            <SubRoadMapItem key={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RoadMapItem;
