<template>
    <div>
      <el-card header = "请登录" class="login-card">
            <el-form>
            <el-form-item label = "用户名">
            <el-input></el-input>
            </el-form-item>
            <el-form-item label = "密码">
            <el-input></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type = "primary" native-type="submit">登录</el-button>
            </el-form-item>
            </el-form>
      </el-card>
    </div>
</template>

<style>
.login-card{
    width:25rem;
    margin:15rem auto;
}
</style>