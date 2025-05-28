import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: { instrumentationHook: true },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'moaguide.vercel.app'
          }
        ],
        destination: 'https://moaguide.com/:path*',
        permanent: true
      }
    ];
  },

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
      'ssl.pstatic.net',
      'imgnews.pstatic.net'
    ]
  },

  swcMinify: true,

  compiler: {
    styledComponents: true
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['msw/browser'] = false;
    } else {
      config.resolve.alias['msw/node'] = false;
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
