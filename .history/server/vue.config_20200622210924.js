module.exports = {
    //将admin编译的dist文件输出到server的admin文件夹
    outputDir: __dirname +'/../server/admin',
    //这里的/admin路径是对应了编译过后引入js。css等静态文件的路径的根路径
    publicPath:process.env.NODE_ENV === 'production'
    ? '/admin'
    : '/'
}