const path = require('path');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // use: 'ts-loader',
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader', options: { transpileOnly: true } }
                ]
            }
            ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        library: "@alphawallet/token-negotiator",
        libraryTarget: 'commonjs2',
        globalObject: 'this',
        umdNamedDefine: true
    },
    // watch: true,
    watch: false,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/
    }
};