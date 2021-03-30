import { useEffect } from 'react';
import { useRouter } from 'next/router';

import analytic from '.';

export default function useAnalytic() {
  const router = useRouter();
  useEffect(() => {
    analytic.init();
    analytic.trackPageview(); // Track initial page

    function onRouteChangeComplete() {
      analytic.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
}
