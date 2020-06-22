module.exports = app =>{
    const express = require('express')
    const route = express.Router({
        mergeParams:true  //为了可以使用resource参数
    })

    //添加数据的接口
    route.post('/',async(req,res) =>{
        const model =  await req.Model.create(req.body)
        res.send(model)
    })
    //编辑数据的接口
    route.put('/:id',async(req,res) =>{
        const model =  await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //寻找所有数据的接口，展示到数据列表
    route.get('/',async(req,res) =>{
        let queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        //关联查询
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //按照id寻找的接口
    route.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //删除数据的接口
    route.delete('/:id',async(req,res) =>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    //匹配以admin/api开头的路由
    app.use('/admin/api/rest/:resource',async(req,res,next) =>{
        //找到大写单数的数据集合名
        const modelName = require('inflection').classify(req.params.resource)
        //这里因为引入变量要使用反引号，并且要把它都挂载到req上
        req.Model = require(`../../models/${modelName}`)
        next()
    },route)

    const multer =  require('multer')
    const upload = multer({ dest:__dirname + '/../../uploads'})
    //图片上传
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //登录路由
    app.post('admin/api/login',async(req,res) =>{
        
    })
}