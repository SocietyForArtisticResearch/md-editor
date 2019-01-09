const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/editor.ts'),
    output: {
        filename: 'editor.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};
