import type { ReportListsItem, StudyGuidesItem, SubLoadmap } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SubLoadmapSkeleton from '../skeleton/SubLoadmapSkeleton';
import CategorySubloadmapItem from './CategorySubloadmapItem';

const CategoryReportItem = ({ id, difficulty, title, description }: StudyGuidesItem) => {
  const [details, setDetails] = useState<SubLoadmap[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [toggleImage, setToggleImage] = useState('/images/report/toggle_button.svg');

  const fetchDetails = async (itemId: number) => {
    if (!details) { // 데이터가 없을 때만 호출
      setLoadingDetails(true);
      try {
        const response = await axios.get(`https://api.moaguide.com/study/guide/${itemId}`);
        setTimeout(() => {
          setDetails(response.data);
          setLoadingDetails(false);
        }, 500);
      } catch (error) {
        console.error('Fetching details failed:', error);
        setLoadingDetails(false);
      }
    }
    setShowDetails(!showDetails);
    setToggleImage(showDetails ? '/images/report/toggle_button.svg' : '/images/report/toggle_button_close.svg');
  };

  return (
    <div className='py-5'>
      <div className="flex gap-5 items-center cursor-pointer">
        <div className="flex-1 flex flex-col gap-3">
          <div className="max-w-max p-1 sm:p-[6px] flex items-center justify-center rounded-[4px] bg-gray50 text-gray400 text-caption3">
            {difficulty}
          </div>
          <div className="text-gray600 text-body5 sm:text-title1">{title}</div>
          <div className="text-gray300 text-caption3 sm:text-body7">{description}</div>
        </div>
        <img
          src={toggleImage}
          alt="Toggle Details"
          className="w-[30px] h-[30px]"
          onClick={() => fetchDetails(id)}
        />
      </div>
      <div>
      {showDetails && (
        loadingDetails ? Array.from({ length: 3 }).map((_, i) => <SubLoadmapSkeleton key={i} isTop={i === 0} isBottom={i === 2} />) : details?.map((detail, index) => (
          <CategorySubloadmapItem key={index} data={detail} isTop={index === 0} isBottom={index === details.length - 1} />
        ))
      )}
      </div>
    </div>
  );
};

export default CategoryReportItem;
