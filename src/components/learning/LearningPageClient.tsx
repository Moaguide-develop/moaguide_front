'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import PopularContents from '@/components/learning/PopularContents';
import RecentContents from '@/components/learning/RecentContents';
import LatestNewsClipping from '@/components/learning/LatestNewsClipping';
import FilteredContents from '@/components/learning/FilteredContents';
import HomeIcon from '../../../public/images/learning/learning_home.svg';
import ArrowIcon from '../../../public/images/learning/bottom_arrow_button.svg';

const dropdownOptions = {
  type: [
    { label: '전체', value: 'all' },
    { label: '아티클', value: 'article' },
    { label: '영상', value: 'video' },
  ],
  category: [
    { label: '전체', value: 'all' },
    { label: '이 달의 인기 콘텐츠', value: 'popular' },
    { label: '최신 콘텐츠', value: 'speed' },
    { label: '오늘의 뉴스', value: 'news' },
    { label: '조각투자 📘 기초 가이드', value: 'guide' },
    { label: '🏠 부동산', value: 'building' },
    { label: '🎨 미술품', value: 'art' },
    { label: '🎶 음악저작권', value: 'music' },
    { label: '🎬 콘텐츠', value: 'content' },
    { label: '🐄 한우', value: 'cow' },
    { label: '💼 사회초년생 재테크 가이드', value: 'money' },
  ],
};

const LearningPageClient = ({ initialData }: { initialData: any }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
  
    const fetchContentsWithPage = async () => {
      const type = selectedType || 'all';
      const category = selectedCategory || 'all';
      const endpoint = `http://43.200.90.72/contents/list?type=${type}&category=${category}&page=${page}`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('API 호출 실패');
      return response.json();
    };
  
    const { data, isLoading } = useQuery({
      queryKey: ['contents', selectedType, selectedCategory, page],
      queryFn: fetchContentsWithPage,
      enabled: !!(selectedType || selectedCategory),
    });
  
    const resetFilters = () => {
      setSelectedType('');
      setSelectedCategory('');
      setPage(1);
      setActiveDropdown(null);
    };
  
    const handleTypeChange = (value: string) => {
      setSelectedType(value);
      setSelectedCategory('all');
      setPage(1); 
      setActiveDropdown(null);
    };
  
    const handleCategoryChange = (value: string) => {
        if (!selectedType) {
          setSelectedType('all');
        }
        setSelectedCategory(value);
        setPage(1);
        setActiveDropdown(null);
      };
  
    return (
      <div>
        <div className="flex justify-end items-center border-b bg-gray-50 shadow-sm relative z-50">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-6 py-4 text-lg font-semibold text-gray-800"
          >
            <Image src={HomeIcon} alt="Home Icon" width={20} height={20} />
          </button>
  
          <div className="flex w-1/2">
            <div className="relative flex-1">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'type' ? null : 'type')
                }
                className="w-[90%] mx-auto flex items-center justify-between py-4 text-lg font-semibold"
              >
                {selectedType
                  ? dropdownOptions.type.find((o) => o.value === selectedType)?.label
                  : '콘텐츠 유형'}
                <Image
                    src={ArrowIcon}
                    alt="Arrow Icon"
                    width={12}
                    height={12}
                    className={`transition-transform duration-300 ${
                        activeDropdown === 'type' ? 'rotate-180' : ''
                    }`}
                    />
              </button>
  
              {activeDropdown === 'type' && (
                <div className="absolute left-0 top-full w-full bg-white border shadow-lg z-50">
                  {dropdownOptions.type.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTypeChange(option.value)}
                      className="w-full block px-4 py-2 hover:bg-gray-100 text-start"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
  
            <div className="relative flex-1">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'category' ? null : 'category')
                }
                className="w-[90%] mx-auto flex items-center justify-between py-4 text-lg font-semibold"
              >
                {selectedCategory
                  ? dropdownOptions.category.find((o) => o.value === selectedCategory)?.label
                  : '카테고리'}
                <Image
                    src={ArrowIcon}
                    alt="Arrow Icon"
                    width={12}
                    height={12}
                    className={`transition-transform duration-300 ${
                        activeDropdown === 'category' ? 'rotate-180' : ''
                    }`}
                    />
              </button>
  
              {activeDropdown === 'category' && (
                <div className="absolute left-0 top-full w-full bg-white border shadow-lg z-50">
                  {dropdownOptions.category.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleCategoryChange(option.value)}
                      className="w-full block px-4 py-2 hover:bg-gray-100 text-start"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="max-w-[360px] mx-auto desk:max-w-[1000px] w-[90%] lg:w-[100%]">
          {!selectedType && !selectedCategory ? (
            <>
              <PopularContents contents={initialData.popularContents} />
              <RecentContents contents={initialData.recentContents} />
              <LatestNewsClipping contents={initialData.latestNewsClipping} />
            </>
          ) : isLoading ? (
            null
          ) : (
            <FilteredContents
              contents={data?.content || []}
              total={data?.total || 0}
              page={page}
              size={data?.size || 5}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default LearningPageClient;