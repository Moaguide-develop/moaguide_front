import { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import QueryProvider from '@/providers/QueryProvider';
import IntegrateMSW from '@/mocks/IntegrateMsw';
import Script from 'next/script';
import ModalProvider from '@/providers/ModalProvider';
import MobileFooter from '@/components/common/MobileFooter';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import GnbWrapper from '@/components/common/GnbWrapper';

import './plugin';

declare global {
  interface Window {
    kakao: any;
  }
}

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

export const metadata: Metadata = {
  title: '모아가이드',
  description:
    '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 정보 큐레이션 플랫폼입니다. 다양한 자산 정보와 투자 가이드를 한곳에서 확인하세요.',
  icons: {
    icon: '/favicon.svg'
  },
  keywords: ['모아가이드', 'moaguide', 'STO 큐레이션', '블록체인', '투자 플랫폼'], // 추가된 부분
  openGraph: {
    title: '모아가이드',
    description:
      '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 정보 큐레이션 플랫폼입니다. 다양한 자산 정보와 투자 가이드를 한곳에서 확인하세요.',
    url: 'https://moaguide.com',
    siteName: '모아가이드',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/moaguideLogo.svg',
        alt: '모아가이드 대표 이미지'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <IntegrateMSW>
          <QueryProvider>
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`}
            />
            <GnbWrapper />
            {children}
            <MobileFooter />
            <ModalProvider />
            <div id="root-portal"></div>
          </QueryProvider>
        </IntegrateMSW>
      </body>
    </html>
  );
}
