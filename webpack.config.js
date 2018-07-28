const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
    path: path.join(__dirname, '/dist/'),
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
    publicPath: '/'
  },
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['src', 'node_modules']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(sa|sc|c)ss$/, use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  devServer: {
    historyApiFallback: true,
    overlay: true,
    port: 8082,
    stats: {
      color: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000/',
        changeOrigin: true
      }
    }
  }
};
