const babelOptions = {
    parserOpts: {
        'allowReturnOutsideFunction': true
    },
};

// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
module.exports = require('babel-jest').default.createTransformer(babelOptions);