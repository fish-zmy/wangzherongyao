module.exports = app =>{
    const express = require('express')
    const route = express.Router({
        mergeParams:true  //为了可以使用resource参数
    })

    //添加分类的接口
    route.post('/',async(req,res) =>{
        const model =  await Category.create(req.body)
        res.send(model)
    })
    //编辑分类的接口
    route.put('/:id',async(req,res) =>{
        const model =  await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //寻找所有数据的接口，展示到分类列表
    route.get('/',async(req,res) =>{
        //关联查询
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    //按照id寻找的接口
    route.get('/:id',async (req,res)=>{
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    //删除数据的接口
    route.delete('/:id',async(req,res) =>{
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    //匹配以admin/api开头的路由
    app.use('/admin/api/rest/:resource',async(req,res,next) =>{
        //找到大写单数的数据集合名
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },route)
}