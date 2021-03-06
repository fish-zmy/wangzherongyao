//登录服务端校验
module.exports = options =>{
    return async(req,res,next)=>{
        const token = String(req.headers.authorization || '').split(' ').pop()
        //assert用法：token不存在，就设置状态码为401，报错信息为请先登录
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}