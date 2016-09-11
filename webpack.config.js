var path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcDir = path.resolve(process.cwd(), 'src');
console.log('srcDir::::',srcDir)
//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        // matchs = item.match(/(.+)_main.jsx?$/);
        matchs = item.match(/(.+)(_main)\.jsx?$/);
        // console.log("matchs:::",matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    // console.log("filesfiles::",JSON.stringify(files));
    return files;
}
console.log("getEntry::::",getEntry())
var config = {
    // devtool:'cheap-module-eval-source-map',  //开发环境推荐
    // devtool:'cheap-module-source-map',  //生产环境推荐
    // entry:{
    //     index:'./src/js/index_main.js',
    //     react_list:'./src/js/react_list_main.jsx',
    // },
    entry:getEntry(),
    output:{
        // publicPath: "http://127.0.0.1:8080/",
        path:path.join(__dirname,'dist/js'),
        filename:"[name].js",
        chunkFilename:"[chunkhash].js",
        publicPath: "./"                //html引用路径，在这里是本地地址。
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
        },{
            // test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') ////.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass'),
            // loaders: ['style', 'css', 'sass'] ////.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=50000&name=../images/[name].[hash].[ext]',  // //url-loader处理图片URL,如果图片小于limit值直接生成`base64` 格式的`dataUrl`,否则输出图片,name参数指定输出目录和图片名
            // loader: "url?limit=8192?name=../images/[hash:8][name].[ext]"  //limit参数，代表如果小于大约50k则会自动帮你压缩base64编码的图片
            // loader: 'file-loader?name=../images/[hash:8].[name].[ext]' //保持图片原路径
        }]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'  //使jquery变成全局变量，可以不用在自己的文件中require('jquery')
        }),
        new CommonsChunkPlugin({
            name:"common",
            // name:['jquery','react'],
            // minChunks: Infinity,
            // children: true,
            // async: true,
            // minChunks:2,  //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks
            filename:"common.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
        }),
        // new ExtractTextPlugin("css/[name].css"),  //单独使用style标签加载css并设置其路径
        new ExtractTextPlugin('../style/[name].css')
        // new ExtractTextPlugin("mycss/app.css",{allChunks:true})
        // new webpack.DllReferencePlugin({
        //     context:__dirname,
        //     manifest: require('./manifest.json'),
        // })
    ],
    externals: {
        moment: true  //使用cdn
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