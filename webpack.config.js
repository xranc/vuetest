const HtmlWebpackPlugin = require('html-webpack-plugin')//这是个构造函数，后面要用的是它的实例
const path = require('path') //用来解析路径相关信息的模块
module.exports = {//配置对象
    //入口
    entry: {
        xxx: path.resolve(__dirname,'src/index.js')  //resolve 解析 获得一个绝对路径
    },//_dirname 是node自带的，指当前目录的绝对路径
    //出口
    output: {
        filename: 'static/js/[name].bundle.js',//指定最后的打包文件，[name]是entry那的名字，这里是xxx
        path: path.resolve(__dirname,'dist')
    },//配到这里就可以打包了，但是下面的图片 html什么的都没法打包
    //模块加载器
    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
              },
              {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
              }

        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',//指定打包的模板和结果（在根目录查找）
            filename: 'index.html'//在output指定的path下
        })
        
    ],
    devServer: {
        open: true, // 自动打开浏览器
        quiet: true, // 不做太多日志输出
      },
    devtool: 'cheap-module-eval-source-map',
}