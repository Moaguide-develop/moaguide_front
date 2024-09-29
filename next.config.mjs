/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { instrumentationHook: true },
  reactStrictMode: true,

  images: {
    domains: ['www.kobis.or.kr', 'd2qf2amuam62ps.cloudfront.net']
  },
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['api.moaguide.com'], 
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