const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
    
  },
  publicPath: '/agora/',
};