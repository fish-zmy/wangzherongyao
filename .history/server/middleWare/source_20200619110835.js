module.exports = options => {
    return async(req,res,next) =>{
        //找到大写单数的数据集合名
        const modelName = require('inflection').classify(req.params.resource)
        //这里因为引入变量要使用反引号，并且要把它都挂载到req上
        req.Model = require(`../../models/${modelName}`)
        next()
    }
  }