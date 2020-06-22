const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        //设置查询的时候查询不到密码，避免把已经散列了的密码再次散列，这样子就不会是原来的密码了
        select:false,
        //密文密码
        set(val){
            //散列的加密指数，一般10-12
            return require('bcrypt').hashSync(val,10)
        }
    }
    

})

module.exports = mongoose.model('AdminUser',schema)