import Script from 'next/script';

interface NaverAnalyticsProps {
  waId: string;
}

export default function NaverAnalytics({ waId }: NaverAnalyticsProps) {
  return (
    <>
      {/* 외부 스크립트 로드 */}
      <Script
        src="//wcs.naver.net/wcslog.js"
        strategy="afterInteractive" // strategy를 afterInteractive로 수정
      />

      {/* 인라인 스크립트 */}
      <Script
        id="naver-analytics-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "${waId}";
            if(window.wcs) {
              wcs_do();
            }
          `
        }}
      />
    </>
  );
}