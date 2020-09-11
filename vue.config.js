const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  // options...
  //   indexPath: 'index.html',
    publicPath: '',
    configureWebpack: {
        output: {
            filename: '[name].bundle.js',
            // filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackInlineSourcePlugin(),
            new HtmlWebpackPlugin({
                inlineSource: '.(js|css)$', // embed all javascript and css inline
                inject: true,
                template: 'public/index.html',  //template file to embed the source
                title: 'Cloudsplaining report',
            }),
        ],
        // optimization: {
      //   splitChunks: {
      //     chunks: 'async',
      //     minSize: 30000,
      //     maxSize: 0,
      //     minChunks: 1,
      //     maxAsyncRequests: 5,
      //     maxInitialRequests: 3,
      //     automaticNameDelimiter: '~',
      //     name: true,
      //     cacheGroups: {
      //       vendors: {
      //         test: /[\\/]node_modules[\\/]/, // this is what you are looking for
      //         priority: -10
      //       },
      //       default: {
      //         minChunks: 2,
      //         priority: -20,
      //         reuseExistingChunk: true
      //       }
      //     }
      //   }
      // }
        optimization: {
            splitChunks: {
                name: false,
                chunks: 'async',
                hidePathInfo: true,
            }
        }
    },
    css: { extract: false }
}