var path = require('path');
var config = {
    devtool:'cheap-module-eval-source-map',  //开发环境推荐
    // devtool:'cheap-module-source-map',  //生产环境推荐
    entry:{
        index:'./src/js/index.js',
        react_list:'./src/js/react_list.jsx'
    },
    output:{
        path:path.join(__dirname,'dist/js'),
        filename:"[name].js",
        chunkFilename:"[chunkhash].js",
        // publicPath:'dist/js'
    },
    module:{
        noParse: [/moment-with-locales/], //忽略对已知文件的解析 一个模块中没有其它新的依赖 就可以配置这项
        loaders:[{
            test:/\.jsx?$/,
            loader:'babel',
            query:{
                //添加两个presets，使用这两种presets处理js或jsx文件
                presets:['es2015','react']
            }
        }
        ]
    },
    externals: {
        moment: true
    },
    resolve:{
        alias:{
            moment:'moment/min/moment-with-locales.min.js',
            react:'react/dist/react.min.js',
            'react-dom':'react-dom/dist/react-dom.min.js',
        },
        extensions:['','.js','.json','.jsx']  //用于指明程序自动补全识别哪些后缀注意一下, extensions 第一个是 空字符串 ! 对应不需要后缀的情况
    }

}
module.exports = config;