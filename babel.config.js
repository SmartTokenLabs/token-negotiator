module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        ["@babel/transform-runtime", '@babel/plugin-syntax-dynamic-import']
    ]
}
