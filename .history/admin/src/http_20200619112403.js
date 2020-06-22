import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http =axios.create({
    baseURL:'http://localhost:3000/admin/api'
})
/**
 * 客户端请求时设置一个拦截器，在它请求前进行全局处理
 */
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


/**
 * 给服务端返回的错误的一个处理
 */
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
     //如果服务端返回401错误就表明是登录校验的问题，前端要把路由返回到登录页面
     if(err.response.status === 401){
         router.push('/login')
     }
     return Promise.reject(err)
})

export default  http