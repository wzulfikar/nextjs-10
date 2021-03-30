import { NextSeo } from 'next-seo';

import { appName, baseUrl } from '@src/config/app';
import seoConfig, { defaultDescription } from '@src/config/seo';
import { OpenGraph } from 'next-seo/lib/types';

export type SEOProps = {
  title: (appName: string) => string | string;
  description?: string;
  path: string;
  images?: typeof seoConfig.openGraph.images;
};

export function getImageObject(imageUrl: string) {
  return {
    url: imageUrl,
    width: 860,
    height: 506,
    alt: `Image from ${appName}`,
  };
}

export default function SEO(props: SEOProps) {
  let { title, description = defaultDescription, path, images = [] } = props;

  const url = baseUrl + path;

  const openGraph: OpenGraph = {
    ...seoConfig.openGraph,
    title: typeof title === 'string' ? title : title(appName),
    description,
    url,
  };

  if (images.length > 0) openGraph.images = images;

  return (
    <NextSeo
      title={openGraph.title}
      description={description}
      canonical={url}
      openGraph={openGraph}
      twitter={seoConfig.twitter}
    />
  );
}
