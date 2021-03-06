const express = require('express')

const app = express()

app.set('secret','sdafs')

//跨域
app.use(require('cors')())
//为了可以使用req.body
app.use(express.json())
//开放静态资源
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/uploads',express.static(__dirname + '/uploads'))


require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,() =>{
    console.log('3000 run');
})