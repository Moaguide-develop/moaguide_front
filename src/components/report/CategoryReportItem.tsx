import type { ReportListsItem, StudyGuidesItem, SubLoadmap } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SubLoadmapSkeleton from '../skeleton/SubLoadmapSkeleton';

const CategoryReportItem = ({ id, difficulty, title, description }: StudyGuidesItem) => {
  const router = useRouter();
  const [details, setDetails] = useState<SubLoadmap[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false); 

  const fetchDetails = async (itemId: number) => {
    setLoadingDetails(true); // 로딩 시작
    setShowDetails(true);
    try {
      const response = await axios.get(`https://api.moaguide.com/study/guide/${itemId}`);
      setDetails(response.data);
    } catch (error) {
      console.error('Fetching details failed:', error);
    }
    setLoadingDetails(false); // 로딩 종료
  };

  const toggleDetails = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      if (!details) {
        fetchDetails(id);
      } else {
        setShowDetails(true);
      }
    }
  };

  return (
    <div className='py-5'>
    <div className="flex gap-5 items-center cursor-pointer" 
    // onClick={() => router.push(`/report/${id}`)}
    onClick={toggleDetails}
    >
      <div className="flex-1 flex flex-col gap-3">
        <div className="max-w-max p-1 sm:p-[6px] flex items-center justify-center rounded-[4px] bg-gray50 text-gray400 text-caption3">
          {difficulty}
        </div>
        <div className="text-gray600 text-body5 sm:text-title1">{title}</div>
        <div className="text-gray300 text-caption3 sm:text-body7">{description}</div>
      </div>
        <img
          src={'/images/report/toggle_button.svg'}
          alt=""
          onClick={() => fetchDetails(id)}
          className="w-[30px] h-[30px]"
        />
      </div>
      {showDetails && (
        loadingDetails ?   Array.from({ length: 3 }).map((_, i) => <SubLoadmapSkeleton key={i} />) : (
          details?.map((detail) => (
            <div key={detail.id} className="flex p-2 border-t border-gray-200">
              <h4>{detail.title}</h4>
              <p>{detail.description}</p>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default CategoryReportItem;
