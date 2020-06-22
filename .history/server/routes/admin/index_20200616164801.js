module.exports = app =>{
    const express = require('express')
    const route = express.Router()
    route.post('/categories',async(req,res) =>{
        
    })

    //匹配以admin/api开头的路由
    app.use('/admin/api',route)
}