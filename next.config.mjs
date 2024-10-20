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
      'www.chuksannews.co.kr'
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

export default bundleAnalyzer(nextConfig);
