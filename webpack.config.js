const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/pages', 'index.tsx'),
    mode: 'development',

    module: {
        rules: [{
            test: /\.tsx$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};