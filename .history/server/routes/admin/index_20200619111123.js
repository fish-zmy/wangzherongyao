module.exports = app =>{
    const express = require('express')
    const authMiddleWare = require('../../middleWare/auth')
    const sourceMiddleWare = require('../../middleWare/source')
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
    app.use('/admin/api/rest/:resource',authMiddleWare(),sourceMiddleWare(),route)

       //图片上传
    const multer =  require('multer')
    const upload = multer({ dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',authMiddleWare(),upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //登录路由
    app.post('/admin/api/login',async(req,res) =>{
        // res.send('ok')
        
        // 1、根据用户名查找用户名
        const {username,password} = req.body
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({
            //前者是数据库里的，后者是前面解构定义的，也可简写成username一个
            username:username
        }).select('+password') //默认password是查询不了的，这里设置为可以查出来
        //用户不存在
        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
         // 2、用户存在 校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        if(!isValid){
           return res.status(422).send({
               message:"密码错误"
           }) 
        }
        // 3、返回token,安装jsonwebtoken
        const jwt = require('jsonwebtoken')
        //生成一个token
        const token = jwt.sign({id:user._id },app.get('secret'))
        res.send({token})
    })
}