const withAntdLess = require('next-plugin-antd-less');

let withBundleAnalyzer = (bundle) => bundle;
if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
}

const bundle = withAntdLess({
  // See: https://github.com/SolidZORO/next-plugin-antd-less
  modifyVars: { '@primary-color': '#5046e5' },
  lessVarsFilePath: './src/styles/antd.less',

  // Optionsl https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
      modules: {
          auto: true
      }
  },
  
  // Other Config Here...

  webpack(config) {
    return config;
  },
});

module.exports = withBundleAnalyzer(bundle)