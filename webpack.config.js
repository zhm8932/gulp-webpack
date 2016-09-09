var path = require('path');
var config = {
    entry:{
       index:'./src/js/index.js'
    },
    output:{
        path:path.join(__dirname,'dist/js'),
        filename:"[name].js",
        chunkFilename:"[chunkhash].js",
        publicPath:'dist/js'
    },
    module:{
        loaders:[{
            test:/\.js$/,
            loader:'babel-loader',
            query:{
                presets:['es2015']
            }
        }]
    }
}
module.exports = config;