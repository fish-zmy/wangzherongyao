import axios from 'axios'
import Vue from 'vue'
const http =axios.create({
    baseURL:'http://localhost:3000/admin/api'
})
//给所有的组件挂载一个错误处理,拦截器：interceptors
http.interceptors.response.use(res =>{
     return res
},err =>{ //如果服务端发生错误
     console.log(err.response)  
     if(err.response.data.message){
         Vue.prototype.$message({
             type:'error',
             message:err.response.data.message
         })
     }
     return Promise.reject(err)
})

export default  http