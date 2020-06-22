const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    parent:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'Category'  //关联
    }
    

})

module.exports = mongoose.model('Category',schema)