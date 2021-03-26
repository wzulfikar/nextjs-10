import { useAsync } from 'react-use';

/**
 * @description
 * Lazy load tests/stubs using react hook
 *
 * @example
 * ```
 * import useStubs from '@tests/stubs/useStubs';
 *
 * // Use in component
 * const stubs = useStubs();
 * if (stubs.loading) return 'loading..';
 * const org = stubs.buildUser();
 * ```
 */
export default function useStubs() {
  const { value: stubs, loading, error } = useAsync(
    async () => import(/* webpackChunkName: "tests_stubs" */ '@tests/stubs')
  );

  return {
    ...stubs,
    loading,
    error,
  };
}
