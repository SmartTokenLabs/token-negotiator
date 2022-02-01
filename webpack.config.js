const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.ts',
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
        extensions: ['.tsx', '.ts', '.js'],
        fallback:
        {
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
    // watch: true,
    watch: false,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/
    },
    optimization: {
        minimize: true
    }

};
