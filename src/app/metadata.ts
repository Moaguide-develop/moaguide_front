import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모아가이드',
  description:
    '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 서비스입니다. 다양한 자산 정보와 투자 가이드를 한 곳에서 확인하세요.',
  icons: { icon: '/favicon1.ico' },
  keywords: ['모아가이드', 'moaguide', 'STO 큐레이션', '블록체인', '투자 플랫폼'],
  openGraph: {
    title: '모아가이드',
    description:
      '모아가이드는 조각투자 및 소액투자를 쉽게 시작할 수 있도록 돕는 서비스입니다. 다양한 자산 정보와 투자 가이드를 한 곳에서 확인하세요.',
    url: 'https://moaguide.com',
    images: [{ url: 'https://moaguide.com/logo.png' }],
    siteName: '모아가이드',
    locale: 'ko_KR',
    type: 'website'
  }
};
