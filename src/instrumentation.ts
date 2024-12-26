import * as Sentry from '@sentry/nextjs';

export async function register() {
  // if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development') {
  //   const { server } = await import('./mocks/server');
  //   server.listen({
  //     onUnhandledRequest: 'bypass'
  //   });
  // }

  // Sentry 초기화
  const { init } = await import('@sentry/nextjs');

  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Sentry DSN 환경 변수
    tracesSampleRate: 1.0, // 성능 모니터링 비율
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV || 'development', // 환경 설정
    integrations: [] // 필요한 Sentry 통합 옵션 추가
  });
}
