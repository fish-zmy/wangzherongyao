const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        set(val){
            //散列的加密指数，一般10-12
            return require('bcrypt').hashSync(val,10)
        }
    }
    

})

module.exports = mongoose.model('AdminUser',schema)