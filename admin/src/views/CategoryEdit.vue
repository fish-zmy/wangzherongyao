<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
      <!--这里v-model绑定的是数据库里的名字-->
        <el-select v-model="model.parent">
        <!-- label是显示出来的名称，value是存进去的值-->
        <el-option
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
        </el-select>
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
      model:{},
      parents:[]
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
       //这里赋值的方式不使用原来的
      //this.model = res.data
      //使用下面这种浅拷贝，可以使得返回的属性是model+res.data里的，而不会让res.data去覆盖掉了原来的model
      this.model = Object.assign({}, this.model, res.data);
    },
    //创建分类时
    async fetchParents(){
      //获得所有分类
      const res = await this.$http.get('/rest/categories');
      this.parents = res.data;

    }
  },
  created() {
    this.fetchParents()
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>