const babelOptions = {
    parserOpts: {
        'allowReturnOutsideFunction': true
    },
};
module.exports = require('babel-jest').default.createTransformer(babelOptions);