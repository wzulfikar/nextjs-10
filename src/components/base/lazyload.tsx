import dynamic from 'next/dynamic';

import DotsLoader from './DotsLoader';

/**
 * `lazyload` wraps next/dynamic with common defaults for our app context.
 */
const lazyload: typeof dynamic = (
  component,
  { ssr = true, loading = () => <DotsLoader /> } = {}
) =>
  dynamic(component, {
    loading,
    ssr,
  });

export default lazyload;
