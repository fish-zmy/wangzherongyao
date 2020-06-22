const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }

})

module.exports = mongoose.model('Heroe',schema)