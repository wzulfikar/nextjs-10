const sitemap = require('nextjs-sitemap-generator');
const withAntdLess = require('next-plugin-antd-less');

const nextHandlers = require('./next-handlers.js');

let withBundleAnalyzer = (bundle) => bundle;
if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
}

// Generate sitemap.
// See: https://github.com/IlusionDev/nextjs-sitemap-generator
sitemap({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  pagesDirectory: __dirname + '/pages',
  targetDirectory: 'public/',
  ignoredPaths: ['api', '_preview'],
});

const bundle = withAntdLess({
  ...nextHandlers,

  // Uncomment to enable source map in production build.
  // See: https://nextjs.org/docs/advanced-features/source-maps
  // productionBrowserSourceMaps: true,

  // See: https://github.com/SolidZORO/next-plugin-antd-less
  modifyVars: { '@primary-color': '#5046e5' },

  // See: https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    modules: {
      auto: true,
    },
  },

  // Other Config Here...

  webpack(config) {
    // `antd` needs moment and moment will include all its locales by default.
    // We use `moment-locales-webpack-plugin` to remove unused locales from our build.
    if (process.env.NODE_ENV === 'production') {
      const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
      config.plugins.push(new MomentLocalesPlugin());
    }

    return config;
  },
});

module.exports = withBundleAnalyzer(bundle);
