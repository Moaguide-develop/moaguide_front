import { captureException } from '@sentry/nextjs';

export const logAxiosError = (
  error: any,
  // type: ErrorType,
  errorMsg: string,
  isAdmin = false
) => {
  error.message = (isAdmin ? '[Admin] ' : '') + errorMsg;
  captureException(error, {
    tags: {
      // userId: userId,
      api: error.response?.config.url,
      httpMethod: error.config?.method?.toUpperCase(),
      httpStatusCode: (error.response?.status ?? '').toString(),
      environment: process.env.NEXT_PUBLIC_SENTRY_ENV || 'development'
    },
    level: 'error'
    // extra: { type: type }
  });
};
