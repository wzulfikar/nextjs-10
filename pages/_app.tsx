import '@src/styles/globals.css';
import '@src/styles/tailwind-antd-compat.less';

import useAnalytic from '@src/lib/analytic/nextjs-hook';

function MyApp({ Component, pageProps }) {
  useAnalytic();

  return <Component {...pageProps} />;
}

export default MyApp;
