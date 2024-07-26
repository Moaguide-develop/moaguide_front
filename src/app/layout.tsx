import { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Container from '@/components/common/Container';
import Gnb from '@/components/common/Gnb';
import QueryProvider from '@/providers/QueryProvider';
import IntegrateMSW from '@/mocks/IntegrateMsw';
import dynamic from 'next/dynamic';

const FooterProvider = dynamic(() => import('@/providers/FooterProvider'), {
  ssr: false
});

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

/* eslint-disable react-refresh/only-export-components*/
export const metadata: Metadata = {
  title: '모아가이드',
  description: 'STO 큐레이션 플랫폼 모아가이드',
  icons: {
    icon: '/logo.png'
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
        <IntegrateMSW>
          <QueryProvider>
            <Container>
              <Gnb />
              {children}
            </Container>
          </QueryProvider>
        </IntegrateMSW>
        <FooterProvider />
        <div id="footer-portal"></div>
      </body>
    </html>
  );
}
