<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
       <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success = "afterUpload"
        >
        <!--如果上传成功就显示图片，没有就显示原来的上传的样式-->
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--返回一个可多选的英雄类型-->
      <el-form-item label = "类型">
      <el-select v-model="model.categories" multiple>
        <el-option v-for = "items of categories"
        :key = 'items._id'
        :label = "items.name"
        :value = "items._id"
        ></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate :max = "9" show-score v-model = "model.scores.difficult"
        style="margin-top:0.6rem"></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate :max = "9" show-score v-model = "model.scores.difficult"
        style="margin-top:0.6rem"></el-rate>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate :max = "9" show-score v-model = "model.scores.skills"
        style="margin-top:0.6rem"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate :max = "9" show-score v-model = "model.scores.attack"
        style="margin-top:0.6rem"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate :max = "9" show-score v-model = "model.scores.survive"
        style="margin-top:0.6rem"></el-rate>
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
      categories:[],
      model: {
        scores:{
          difficult:0
        }
      }
    };
  },
  methods: {
    //上传
    afterUpload(res){
      //一样的效果
    this.$set(this.model,'avatar',res.url)
    //  this.model.icon = res.url
    },
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑时候，获取所有数据展示
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      //这里赋值的方式不使用原来的
      //this.model = res.data
      //使用下面这种，可以使得返回的属性是model+res.data里的，而不会让res.data去覆盖掉了原来的model
      this.model = Object.assign({},this.model,res.data);
    },
    //获取到categories
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>


<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

