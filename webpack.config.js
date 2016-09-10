var path = require('path');
var config = {
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
        loaders:[{
            test:/\.jsx?$/,
            loader:'babel',
            query:{
                //添加两个presets，使用这两种presets处理js或jsx文件
                presets:['es2015','react']
            }
        }
        ]
    }
}
module.exports = config;