<template>
    <div>
      <el-card header = "请登录" class="login-card">
            <el-form @submit.native.prevent="login">
            <el-form-item label = "用户名">
            <el-input v-model = "model.username"></el-input>
            </el-form-item>
            <el-form-item label = "密码">
            <el-input v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type = "primary" native-type="submit">登录</el-button>
            </el-form-item>
            </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            model:{}
        }
    },
    methods: {
        async login(){
        //    console.log(this.model) 
        //请求后端接口
        const res = await this.$http.post('login',this.model)
        localStorage.token  = res.data.token
        this.$router.push('/')
        this.$message({
            type:"success",
            message:"登录成功"
        })
        }
    },

}
</script>

<style>
.login-card{
    width:25rem;
    margin:6rem auto;
}
</style>