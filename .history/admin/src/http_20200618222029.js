import axios from 'axios'

const http =axios.create({
    baseURL:'http://localhost:3000/admin/api'
})
//给所有的组件挂载一个错误处理,拦截器：interceptors
http.interceptors.response.use(res =>{

},err =>{
    
})

export default  http