<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
     prop:{
    id: {}
  }
    data(){
        return {
            model:{}
        }
    },
    methods: {
        //保存
        async save(){
            //请求后台的接口
            const res = await this.$http.post('/categories',this.model)
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
        }
    },
}
</script>