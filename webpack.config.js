const path = require('path');
const webpack = require('webpack');

// more polyfills will be required as the library extends to support blockchain and non blockchain token attestations.

// http-server settings: 
// CORS: disabled
// Cache: 3600 seconds
// Connection Timeout: 120 seconds
// Directory Listings: visible
// AutoIndex: visible
// Serve GZIP Files: false
// Serve Brotli Files: false
// Default File Extension: none

module.exports = {
    mode: "production",
    entry: './src/index.ts',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
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
        minimize: true
    }
};
