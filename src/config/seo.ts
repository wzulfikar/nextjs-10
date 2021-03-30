import { appName, baseUrl } from './app';

export const defaultTitle = `${appName}`;
export const defaultDescription = 'Collection of codes for Next.js';
export const defaultImage = {
  url: `${baseUrl}/og-default.jpg`,
  alt: `${appName}`,
  width: 860,
  height: 506,
};

export const siteName = baseUrl.split('://').pop();

// See: https://github.com/garmeeh/next-seo
export default {
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
    images: [defaultImage],
    type: 'website',
    locale: 'en_IE',
    site_name: siteName,
  },
  twitter: {
    handle: '@somehandler',
    site: siteName,
    cardType: 'summary_large_image',
  },
};
