module.exports = app =>{
    const express = require('express')
    const route = express.Router()
    

    //匹配以admin/api开头的路由
    app.use('/admin/api',route)
}