// Use `require` instead of `import` to include styles from less files.
// Otherwise the styles will be applied in `next dev` but not in production.
// See: https://github.com/SolidZORO/next-plugin-antd-less#tips
require('@src/styles/antd.less');
require('@src/styles/tailwind-antd-compat.less');

// NOTE: somehow the styles won't be applied if using `import`
require('@src/styles/globals.css');

import useAnalytic from '@src/lib/analytic/nextjs-hook';

function MyApp({ Component, pageProps }) {
  useAnalytic();

  return <Component {...pageProps} />;
}

export default MyApp;
