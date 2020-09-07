const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: 'public/index.html',  //template file to embed the source
//         inlineSource: '.(js|css)$' // embed all javascript and css inline
//       }),
//       new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
//     ]
//   }
// }
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
                inject: true,
                template: 'public/index.html',  //template file to embed the source
                inlineSource: '.(js|css)$', // embed all javascript and css inline
                title: 'Cloudsplaining report',
            }),
        ],
        optimization: {
            splitChunks: {
                name: "vendor",
                chunks: 'async',
                hidePathInfo: true
            }
        }
    },
    css: { extract: false }
}