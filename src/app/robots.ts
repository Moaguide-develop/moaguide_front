import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const isMainDomain = siteUrl === 'https://moaguide.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: isMainDomain ? '/' : '',
        disallow: isMainDomain ? '' : '/',
      },
    ],
    sitemap: isMainDomain ? `${siteUrl}/sitemap.xml` : undefined,
  };
}