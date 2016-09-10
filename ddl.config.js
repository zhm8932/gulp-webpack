const webpack = require('webpack');
const vendors =[
    'react',
    'react-dom',
    'jquery'
];

module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
/*
* webpack.DllPlugin 的选项中：

 path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
 name 是 dll 暴露的对象名，要跟 output.library 保持一致；
 context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
 运行Webpack，会输出两个文件一个是打包好的 lib.js，一个就是 manifest.json

*
* */