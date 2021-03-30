// NOTE: somehow the styles won't be applied if using `import`
require('@src/styles/globals.css');

import { DefaultSeo } from 'next-seo';

import useAnalytic from '@src/lib/analytic/nextjs-hook';
import seoConfig from '@src/config/seo';

function MyApp({ Component, pageProps }) {
  useAnalytic();

  return (
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
