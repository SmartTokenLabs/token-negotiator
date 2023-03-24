const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "production",
    target: 'web',
	//entry: './src/index.ts',
    entry: {
		Client: './src/client/index.ts',
		Outlet: './src/outlet/index.ts'
	},
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
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false
				},
			},
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
        filename: 'negotiator-[name].js',
		chunkFilename: 'negotiator-[name]-[chunkhash].js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'token-negotiator-dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
};
