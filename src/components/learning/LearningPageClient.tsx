'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import PopularContents from '@/components/learning/PopularContents';
import RecentContents from '@/components/learning/RecentContents';
import LatestNewsClipping from '@/components/learning/LatestNewsClipping';
import FilteredContents from '@/components/learning/FilteredContents';
import HomeIcon from '../../../public/images/learning/learning_home.svg';
import ArrowIcon from '../../../public/images/learning/bottom_arrow_button.svg';
import BackgroundImage from '../../../public/images/learning/learning_background.png';
import SubscriptionBanner from './SubscriptionBanner';
import { dropdownOptions } from '@/utils/dropdownOptions';
import { OverviewResponse, Content } from '@/types/learning'; 
import { fetchContentsWithPage } from '@/factory/Article/GetArticle';
import { resetSessionValues } from '@/utils/resetSessionValues';

const LearningPageClient = ({ initialData }: { initialData: OverviewResponse }) => {

  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedType(sessionStorage.getItem('selectedType') || '');
      setSelectedCategory(sessionStorage.getItem('selectedCategory') || '');
      const savedPage = sessionStorage.getItem('page');
      setPage(savedPage ? parseInt(savedPage, 10) : 1);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedType', selectedType);
      sessionStorage.setItem('selectedCategory', selectedCategory);
      sessionStorage.setItem('page', page.toString());
    }
  }, [selectedType, selectedCategory, page]);

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
    resetSessionValues();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // setSelectedCategory('all');
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

  const extractContents = (contents: Content[] | undefined) =>
    Array.isArray(contents)
      ? contents.map((item) => ({
          ...item.article,
          likedByMe: item.likedByMe,
        }))
      : [];

  return (
    <div>
      <div className="hidden sm:flex relative w-full h-[300px] lg:h-[400px]">
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-end items-center border-b shadow-sm z-50 bg-[#fffffc]/50">
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
                className="w-full px-4 mx-auto flex items-center justify-between py-4 text-lg font-semibold"
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
                className="w-full px-4 mx-auto flex items-center justify-between py-4 text-lg font-semibold"
              >
                {selectedCategory
                  ? dropdownOptions.category.find((o) => o.value === selectedCategory)
                      ?.label
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
      </div>

      <div className="relative z-50 bg-white sm:hidden">
        <button
          onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
          className="w-full px-6 py-4 text-lg font-semibold flex items-center"
        >
          {selectedCategory
            ? dropdownOptions.category.find((o) => o.value === selectedCategory)?.label
            : '학습하기'}
          <Image
            src={ArrowIcon}
            alt="Arrow Icon"
            width={16}
            height={16}
            className={`transition-transform duration-300 ml-[10px] ${
              activeDropdown === 'mobile' ? 'rotate-180' : ''
            }`}
          />
        </button>
        {activeDropdown === 'mobile' && (
          <div className="absolute left-0 w-full bg-white shadow-lg z-50">
            {selectedCategory !== '' && (
              <div>
                <button
                  onClick={() => {
                    resetFilters(); 
                    setActiveDropdown(null); 
                  }}
                  className="w-full px-6 py-4 text-start text-[#a2a5aa] text-base hover:bg-gray-100 border-b"
                >
                  학습하기
                </button>
              </div>
            )}

            <div>
              {dropdownOptions.category
                .filter((option) => option.value !== selectedCategory)
                .map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleCategoryChange(option.value);
                      setActiveDropdown(null); 
                    }}
                    className="w-full px-6 py-4 text-start text-[#a2a5aa] text-base hover:bg-gray-100 border-b last:border-b-0"
                  >
                    {option.label}
                  </button>
                ))}
            </div>
          </div>
        )}

        <div
          className={`flex border-b border-gray-200 z-10 relative ${
            activeDropdown === 'mobile' ? 'pointer-events-none' : ''
          }`}
        >
          {dropdownOptions.type.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                handleTypeChange(option.value);
                setActiveDropdown(null);
              }}
              className={`px-4 mx-4 py-2 text-lg font-medium ${
                 selectedType === option.value
                  ? 'text-[#1e1e1e] text-base font-bold border-b-2 border-[#6F36E8]'
                  : 'text-[#a2a5aa] text-base font-bold'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[360px] mx-auto desk:max-w-[1000px] w-full mt-8">
        {!selectedType && !selectedCategory ? (
          <>
            <PopularContents contents={extractContents(initialData.popularContents)} />
            <RecentContents contents={extractContents(initialData.recentContents)} />
            <div className="flex w-full">
              <SubscriptionBanner />
            </div>
            <LatestNewsClipping contents={extractContents(initialData.newsContents)} />
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