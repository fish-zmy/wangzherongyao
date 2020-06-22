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
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    //出装推荐,关联一下装备的数据库
    items1:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Item'
    }],
    items2:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Item'
    }],
    //使用技巧
    usageTips:{
        type:String
    },
    //对抗技巧
    battleTips:{
        type:String
    },
    teamTips:{
        type:String
    },
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
    }]


})

module.exports = mongoose.model('Hero',schema)