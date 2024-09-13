import { EducationRoadmaps } from '@/types/educationType';
import React from 'react';

const RoadMapItem = ({ id, description, difficulty, title }: EducationRoadmaps) => {
  return (
    <li className="flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <div className="max-w-max p-[6px] rounded-[4px] flex items-center justify-center bg-bg text-gray400 text-caption2 ">
          {difficulty}
        </div>
        <div className="text-title2 text-gray600">{title}</div>
        <div className="text-body7 text-gray300">{description}</div>
      </div>
      <div className="cursor-pointer">
        <img src="/images/education/toBottom.svg" alt="" />
      </div>
    </li>
  );
};

export default RoadMapItem;
