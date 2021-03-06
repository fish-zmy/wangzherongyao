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
    //英雄类别
    categories:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    }


})

module.exports = mongoose.model('Hero',schema)