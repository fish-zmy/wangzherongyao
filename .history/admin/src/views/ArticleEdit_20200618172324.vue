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
         <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model:{},
      categories:[]
    };
  },
  methods: {
    //改变上传图片的方式
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      var formData = new FormData();
      formData.append("image", file);
 
      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
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