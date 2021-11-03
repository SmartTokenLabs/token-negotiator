const path = require('path');
const { env } = require('process');
const TerserPlugin = require("terser-webpack-plugin");

// Generates the UMD module output.

module.exports = {
  mode: env.production ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    'token-negotiator.min': './src/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'token-negotiator',
    umdNamedDefine: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }
};