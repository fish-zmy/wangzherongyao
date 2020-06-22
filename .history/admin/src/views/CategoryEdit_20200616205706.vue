<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent"></el-select>
        <!-- label是显示出来的名称，value是存进去的值-->
        <el-option
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-form-item>
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
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name:[],
        parents:[]

      }
    };
  },
  methods: {
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.model = res.data;
    },
    //创建分类时
    async newFetch(){
      //获得所有分类
      const res = await this.$http.get('/categories');
      this.parents = res.data;

    }
  },
  created() {
    this.newFetch()
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>