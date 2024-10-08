/** @type {import('next').NextConfig} */
const nextConfig = {
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
      's.pstatic.net'
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

export default nextConfig;
