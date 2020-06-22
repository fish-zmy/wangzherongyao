const express = require('express')

const app = express()

app.use(express.json())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,() =>{
    console.log('3000 run');
})