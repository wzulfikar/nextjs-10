const withAntdLess = require('next-plugin-antd-less');

const nextHandlers = require('./next-handlers.js');

let withBundleAnalyzer = (bundle) => bundle;
if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
}

const bundle = withAntdLess({
  ...nextHandlers,

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
    return config;
  },
});

module.exports = withBundleAnalyzer(bundle);
