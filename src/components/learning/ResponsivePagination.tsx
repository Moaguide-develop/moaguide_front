'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const ResponsivePagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentRange, setCurrentRange] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const pageSize = isMobile ? 5 : 10;
    const range = Math.floor((currentPage - 1) / pageSize);
    setCurrentRange(range);
  }, [currentPage, isMobile]);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const pageSize = isMobile ? 5 : 10; 
    const start = currentRange * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalPages);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
  }, [currentRange, totalPages, isMobile]);

  const handlePageClick = (page: number) => {
    onPageChange(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleNextRange = () => {
    const pageSize = isMobile ? 5 : 10;
    if ((currentRange + 1) * pageSize < totalPages) {
      const newRange = currentRange + 1;
      setCurrentRange(newRange);
      const firstPageOfNextRange = newRange * pageSize + 1;
      handlePageClick(firstPageOfNextRange);
    }
  };

  const handlePrevRange = () => {
    if (currentRange > 0) {
      const pageSize = isMobile ? 5 : 10;
      const newRange = currentRange - 1;
      setCurrentRange(newRange);
      const firstPageOfPrevRange = newRange * pageSize + 1;
      handlePageClick(firstPageOfPrevRange);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
      <button
        onClick={handlePrevRange}
        disabled={currentRange === 0}
        className="px-3 py-1 border rounded disabled:opacity-50">
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}>
          {page}
        </button>
      ))}
      <button
        onClick={handleNextRange}
        disabled={(currentRange + 1) * (isMobile ? 5 : 10) >= totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50">
        &gt;
      </button>
    </div>
  );
};

export default ResponsivePagination;