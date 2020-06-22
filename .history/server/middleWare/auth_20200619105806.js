module.exports = options =>{
    return async(req,res,next)=>{
        await next()
    }
}