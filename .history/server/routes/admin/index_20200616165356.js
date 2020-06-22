module.exports = app =>{
    const express = require('express')
    const route = express.Router()
    const Category = require('../../models/Category')
    route.post('/categories',async(req,res) =>{
         await Category.create(req.body)
    })

    //匹配以admin/api开头的路由
    app.use('/admin/api',route)
}