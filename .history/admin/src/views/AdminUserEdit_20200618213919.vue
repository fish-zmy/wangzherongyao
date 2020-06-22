<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type = "text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model:{},
    };
  },
  methods: {
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>