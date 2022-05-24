const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

// more polyfills will be required as the library extends to support blockchain and non blockchain token attestations.

// ie polyfil
// https://medium.com/@karim-sheikh/dynamic-module-loading-ie-11-edge-chrome-firefox-6d4f1842b1bf
// https://www.contentful.com/blog/2017/10/19/put-your-webpack-bundle-on-a-diet-part-2/
// https://itnext.io/lazy-loading-polyfills-4b85c4951e73

module.exports = {
    mode: "production",
    target: 'web',
    entry: './src/client/index.ts',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        // new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader', options: { transpileOnly: true } }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        alias: {
            "process": "process/browser",
            "Buffer": "buffer",
            "stream": "stream-browserify"
        },
        extensions: ['.tsx', '.ts', '.js'],
        fallback:
        {
            "buffer": require.resolve('buffer/'),
            "http": require.resolve("stream-http"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/"),
            "url": require.resolve("url/")
        }
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main']
    },
    output: {
        library: 'negotiator',
        filename: 'negotiator.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
};

// https://webpack.js.org/guides/tree-shaking/