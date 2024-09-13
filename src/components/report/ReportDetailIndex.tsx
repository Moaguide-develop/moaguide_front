'use client';
import type { ReportListsItem } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useDownloadPDF from '@/hook/useDownloadPDF';

const ReportDetailIndex = ({ data }: { data: ReportListsItem }) => {
  const router = useRouter();
  const reportContentRef = useRef<HTMLDivElement>(null);
  const downloadPDF = useDownloadPDF('/images/logo.svg', reportContentRef, data.title);

  return (
    <div className="px-5 sm:px-0">
      {/* 리포트 */}
      <div className="my-[28px]" ref={reportContentRef}>
        {/* 리포트 헤더 */}

        <div className="pb-5 border-b border-gray100 flex flex-col gap-3">
          <div className="max-w-max p-[6px] flex items-center justify-center rounded-[4px] bg-gray50 text-gray400 text-caption3">
            {formatCategory(data.category)}
          </div>
          <div className="text-heading3 text-gray700 ">{data.title}</div>
          <div className="text-gray300 text-body7">
            {' '}
            {format(parseISO(data.date), 'yyyy.MM.dd')}
          </div>
        </div>
        {/* 리포트 메인 */}
        <div className="mt-5">
          <ReactMarkdown className="text-body4 text-gray400 ">
            {data.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.back()}
          className="cursor-pointer p-4 max-w-max flex items-center justify-center gap-2 border border-normal rounded-[100px]">
          <img src="/images/report/back.svg" alt="" />
          <span className="text-body1 text-normal">목록으로</span>
        </div>
        <div
          onClick={downloadPDF}
          className="cursor-pointer px-5 py-4 max-w-max flex items-center justify-center gap-2 border border-gray200 rounded-[100px]">
          <span className="text-body1 text-gray400">PDF 다운로드</span>
          <img src="/images/report/down.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ReportDetailIndex;
