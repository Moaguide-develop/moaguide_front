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
import NaverAnalytics from '@/lib/NaverAnalytics';
import AuthWrapper from '@/components/common/AuthWrapper';
import ToastProvider from '@/providers/ToastProvider';
import RefreshTokenWrapper from '@/components/common/RefreshTokenWrapper';
import * as Sentry from '@sentry/nextjs';

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
    '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 서비스입니다. 다양한 자산 정보와 투자 가이드를 한 곳에서 확인하세요.',
  icons: {
    icon: '/favicon1.ico'
  },

  keywords: ['모아가이드', 'moaguide', 'STO 큐레이션', '블록체인', '투자 플랫폼'], // 추가된 부분
  openGraph: {
    title: '모아가이드',
    description:
      '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 서비스입니다. 다양한 자산 정보와 투자 가이드를 한 곳에서 확인하세요.',
    url: 'https://moaguide.com',
    images: [
      {
        url: 'https://moaguide.com/logo.png'
      }
    ],
    siteName: '모아가이드',

    locale: 'ko_KR',
    type: 'website'
  }
};

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0 // 조정 가능
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <link
        rel="shortcut icon"
        href="https://moaguide.com/favicon1.ico"
        type="image/x-icon"
        sizes="16x16"
      />
      <meta
        name="naver-site-verification"
        content="04dacb01e59bc7de3fb1e9260ae7e5f98ee465ac"
      />
      {/* 본서버 */}
      <meta
        name="google-site-verification"
        content="ny0xpJ4euXAdB5ZrnFoFXHokC41qTBx40mpoBpNRL_M"
      />

      {/* vercel */}
      <meta
        name="google-site-verification"
        content="N2QWerrLhGZ2wlJ_o4ebUAA0u2lFTUjHryP3Ya7Uji0"
      />

      {/* <link rel="icon" href="/moaguideLogo.svg" /> */}
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}

        {process.env.NEXT_PUBLIC_NAVER_ANALYTICS ? (
          <NaverAnalytics waId={process.env.NEXT_PUBLIC_NAVER_ANALYTICS} />
        ) : null}
        <IntegrateMSW>
          <QueryProvider>
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`}
            />
            {/* <AuthWrapper /> */}
            <GnbWrapper />
            <RefreshTokenWrapper />
            {children}
            <MobileFooter />
            <ModalProvider />

            <div id="root-portal"></div>
            <ToastProvider />
            <div id="toast-portal"></div>
          </QueryProvider>
        </IntegrateMSW>
      </body>
    </html>
  );
}
