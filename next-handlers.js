const handlers = {
  /**
   * @description
   * Headers allow you to set custom HTTP headers for an incoming request path (Next.js 9.5 and up).
   *
   * @see
   * [https://nextjs.org/docs/api-reference/next.config.js/headers](https://nextjs.org/docs/api-reference/next.config.js/headers)
   */
  async headers() {
    return [
      {
        source: '/api/unfurl',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=10, stale-while-revalidate',
          },
        ],
      },
    ];
  },
  /**
   * @description
   * Redirects allow you to redirect an incoming request path to a different destination path (Next.js 9.5 and up).
   *
   * @see
   * [https://nextjs.org/docs/api-reference/next.config.js/redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)
   */
  async redirects() {
    return [
      {
        source: '/_preview',
        destination: '/_preview/SanityCheck',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/wzulfikar/nextjs-10',
        permanent: false,
      },
      {
        source: '/analytic',
        destination: process.env.NEXT_PUBLIC_SHARE_ANALYTIC || '/404',
        permanent: false,
      },
    ];
  },
  /**
   * @description
   * Rewrites allow you to map an incoming request path to a different destination path (Next.js 9.5 and up).
   *
   * @see
   * [https://nextjs.org/docs/api-reference/next.config.js/rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
   */
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ];
  },
};

module.exports = handlers;
