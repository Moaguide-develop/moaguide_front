import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const isMainDomain = siteUrl.includes('moaguide.com');

  return {
    rules: [
      {
        userAgent: '*',
        allow: isMainDomain ? '/' : '',
        disallow: isMainDomain ? '' : '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}