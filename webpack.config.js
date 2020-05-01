const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/version.txt', to: 'version.txt' },
    ]),
    new WorkboxPlugin.GenerateSW({
      // skipWaiting: true,
      clientsClaim: true,
      swDest: 'sw.js',
    }),
  ]
};
