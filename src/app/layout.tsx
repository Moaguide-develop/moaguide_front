import { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Gnb from '@/components/common/Gnb';
import QueryProvider from '@/providers/QueryProvider';
import IntegrateMSW from '@/mocks/IntegrateMsw';

import Script from 'next/script';
import ModalProvider from '@/providers/ModalProvider';
import MobileFooter from '@/components/common/MobileFooter';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

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
  description: 'STO 큐레이션 플랫폼 모아가이드',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: '모아가이드',
    description: 'STO 큐레이션 플랫폼 모아가이드',
    url: 'https://moaguide.vercel.app/',
    siteName: '모아가이드',
    locale: 'ko_KR',
    type: 'website'
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
            <Gnb />
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
