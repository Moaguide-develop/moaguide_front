import { CategorySubloadmapItemProps, SubLoadmapBottomArticle } from '@/types/homeComponentsType';
import axios from 'axios';
import React, { useState } from 'react';
import CategorySubloadmapBottomArticle from './CategorySubloadmapBottomArticle';
import SubLoadmapBottomArticleSkeleton from '../skeleton/SubLoadmapBottomArticleSkeleton';

const CategorySubloadmapItem: React.FC<CategorySubloadmapItemProps> = ({ data, isTop, isBottom }) => {

  const [details, setDetails] = useState<SubLoadmapBottomArticle[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [toggleImage, setToggleImage] = useState('/images/report/toggle_button.svg');

  const fetchDetails = async () => {
    if (!details) { // 데이터가 로드되지 않았을 때만 API 호출
      setLoadingDetails(true);
      try {
        const response = await axios.get(`https://api.moaguide.com/study/guide/article?subcategory=${data.id}`);
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
    <div className={`cursor-pointer ${isTop ? 'border-t border-black pt-8 mt-8' : ''} ${isBottom ? 'pb-6' : 'pb-4'}`}>
      <div className="flex gap-5 items-center">
        <div className='flex-1 flex flex-col gap-3'>
          <div className="text-gray600 text-body5 sm:text-title1">{`${data.number}. ${data.title}`}</div>
          <div className="text-gray300 text-caption3 sm:text-body7">{data.description}</div>
        </div>
        <img src={toggleImage} alt="Toggle Details" className="w-[30px] h-[30px]" onClick={fetchDetails} />
      </div>

      {showDetails && (
        <div className="mt-4">
          {loadingDetails ? (
            Array.from({ length: 2 }).map((_, i) => (
              <SubLoadmapBottomArticleSkeleton key={i}/>
            ))
          ) : (
            details?.map((detail, index) => (
              <CategorySubloadmapBottomArticle key={index} data={detail} isTop={index === 0} isBottom={index === details.length - 1} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySubloadmapItem;