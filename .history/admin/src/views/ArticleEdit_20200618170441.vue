<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
        <!-- label是显示出来的名称，value是存进去的值-->
        <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
       <el-form-item label="内容">
        <el-input v-model="model.body"></el-input>
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
      categories:[]
    };
  },
  methods: {
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data;
    },
    //创建分类时
    async fetchCategories(){
      //获得所有分类
      const res = await this.$http.get('/rest/categories');
      this. categories = res.data;

    }
  },
  created() {
    this.fetchCategories()
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>