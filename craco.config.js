// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.path = path.resolve(__dirname, 'src/build'); // Change the build directory to 'src/build'
      return webpackConfig;
    },
  },
};
