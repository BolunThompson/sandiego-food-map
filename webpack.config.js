const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = { 
  entry: './src/index.jsx', 
  mode: 'development',
  output: { 
    path: path.resolve(__dirname,'dist'), 
    filename: 'static/index_bundle.js?' + process.env.SOURCE_VERSION,
  }, 
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(mp3|png|svg|jpg|jpeg|gif|pdf|fbx|glb)$/,
            use: [{
                loader: 'file-loader',
                options: {
                  outputPath: 'static'
                }
            }]
        },
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Output Management',
      template: 'src/index.html',
      analytics_gtag: process.env.ANALYTICS_GTAG,
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
  }
}
