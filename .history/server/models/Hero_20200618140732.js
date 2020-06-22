const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    title:{
        type:String
    },
    categories:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }]

})

module.exports = mongoose.model('Hero',schema)