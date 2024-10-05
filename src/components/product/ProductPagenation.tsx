'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationProps {
  totalPages: number;
}

const ProductPagenation = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentRange, setCurrentRange] = useState<number>(0);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
    const range = Math.floor((page - 1) / 10);
    setCurrentRange(range);
  }, [searchParams]);

  useEffect(() => {
    const start = currentRange * 10 + 1;
    const end = Math.min(start + 9, totalPages);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
  }, [currentRange, totalPages]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleNextRange = () => {
    if ((currentRange + 1) * 10 < totalPages) {
      const newRange = currentRange + 1;
      setCurrentRange(newRange);
      const firstPageOfNextRange = newRange * 10 + 1;
      handlePageClick(firstPageOfNextRange);
    }
  };

  const handlePrevRange = () => {
    if (currentRange > 0) {
      const newRange = currentRange - 1;
      setCurrentRange(newRange);
      const firstPageOfPrevRange = newRange * 10 + 1;
      handlePageClick(firstPageOfPrevRange);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      <button
        onClick={handlePrevRange}
        disabled={currentRange === 0}
        className="px-3 py-1 border rounded disabled:opacity-50 ">
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
          {page}
        </button>
      ))}
      <button
        onClick={handleNextRange}
        disabled={(currentRange + 1) * 10 >= totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50">
        &gt;
      </button>
    </div>
  );
};

export default ProductPagenation;
