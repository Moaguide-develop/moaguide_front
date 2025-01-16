import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: { instrumentationHook: true },

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

const SentryWebpackPluginOptions = {
  org: 'moaguide',
  project: 'javascript-nextjs',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true
  },
  reactComponentAnnotation: {
    enabled: true
  },
  hideSourceMaps: false,
  disableLogger: true,
  automaticVercelMonitors: true
};
export default withSentryConfig(bundleAnalyzer(nextConfig), SentryWebpackPluginOptions);
