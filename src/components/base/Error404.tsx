import { useEffect } from 'react';
import Error from 'next/error';

import logger from '@src/lib/logger';

/**
 * `Error404` renders a full page 404 error message and logs the request.
 */
export default function Error404() {
  useEffect(() => {
    logger.info('page not found:', window.location.href);
  }, []);

  return <Error statusCode={404} />;
}
