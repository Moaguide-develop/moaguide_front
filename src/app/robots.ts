import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isVercel =
    process.env.VERCEL_URL && process.env.VERCEL_URL.includes('vercel.app');
  return {
    rules: [
      {
        userAgent: '*',
        allow: isVercel ? '' : '/',
        disallow: isVercel ? '/' : ''
      }
    ],
    sitemap: 'https://moaguide.com/sitemap.xml'
  };
}
