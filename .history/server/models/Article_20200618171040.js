const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    //所属文章分类
    categories:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'Category'  //关联
    },
    body:{
      type:String  
    }
    

})

module.exports = mongoose.model('Article',schema)