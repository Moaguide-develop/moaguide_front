'use client';

import Script from 'next/script';

export default function NaverAnalytics({ waId }: { waId: string }) {
  return (
    <>
      {/* 네이버 애널리틱스 스크립트 파일 로드 */}
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src="//wcs.naver.net/wcslog.js"
      />
      {/* 네이버 애널리틱스 초기화 코드 */}
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "${waId}";
            if (window.wcs) {
              wcs_do();
            }
          `,
        }}
      />
    </>
  );
}