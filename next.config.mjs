import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});
const nextConfig = {
  styledComponents: true,
  output: 'standalone',
  experimental: { instrumentationHook: true },
  reactStrictMode: true,

  images: {
    domains: [
      'www.kobis.or.kr',
      'd2qf2amuam62ps.cloudfront.net',
      'scs-phinf.pstatic.net',
      'api.moaguide.com',
      'entertain.naver.com',
      's.pstatic.net',
      'search.pstatic.net',
      'imgnews.pstatic.net',
      'mimgnews.pstatic.net',
      'image.newsis.com',
      'www.chuksannews.co.kr',
      'ssl.pstatic.net'
    ]
  },
  swcMinify: true,
  compiler: {
    styledComponents: true
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      else config.resolve.alias['msw/browser'] = false;
    } else {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: 'msw/node', alias: false });
      else config.resolve.alias['msw/node'] = false;
    }
    return config;
  }
};

export default withSentryConfig(bundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'moaguide',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});
