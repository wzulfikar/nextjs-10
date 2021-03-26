const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
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