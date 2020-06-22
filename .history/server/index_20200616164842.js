const express = require('express')

const app = express()

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,() =>{
    console.log('3000 run');
})