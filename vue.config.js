// vue.config.js
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var path = require('path');

module.exports = {
  // options...
    indexPath: 'index.html',
    publicPath: '',
    // configureWebpack: {
    //     output: {
    //         path: path.resolve(__dirname, './dist'),
    //         filename: 'index_bundle.js'
    //     },
    //     plugins: [new HtmlWebpackPlugin()]
    // },
    css: { extract: false }
}